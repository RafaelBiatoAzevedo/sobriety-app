import {
  addSobriety,
  deleteSobriety,
  editSobriety,
  getHistory,
} from "@/src/storage/sobrietyStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useMemo, useState } from "react";

import {
  AddButton,
  ButtonDate,
  ButtonText,
  Card,
  CardTitle,
  CardTitleWrapper,
  Container,
  MenuButton,
  MenuContainer,
  MenuItem,
  MenuText,
  Overlay,
  ScrollContainer,
  Subtitle,
  Title,
} from "../../src/styles/history.styles";

import { CustomModal } from "@/src/components/Modal";
import { useSobriety } from "@/src/context/sobriety/SobrietyContext";
import { Interval } from "@/src/interfaces/interval";
import { formatPeriod } from "@/src/utils/format";
import {
  calculateIntervals,
  getBestStreak,
  hasOverlap,
} from "@/src/utils/history";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Dimensions } from "react-native";
import { useTheme } from "styled-components/native";

export default function History() {
  const { colors } = useTheme();
  const { refresh } = useSobriety();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Interval[]>([]);
  const [bestStreak, setBestStreak] = useState(0);

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [showRelapseModal, setShowRelapseModal] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [relapseDate, setRelapseDate] = useState<Date | null>(null);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showRelapsePicker, setShowRelapsePicker] = useState(false);

  const [editingItem, setEditingItem] = useState<Interval | null>(null);

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<Interval | null>(null);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    async function load() {
      await reload();
    }

    load();
  }, []);

  function handleOpenMenu(event: any, item: Interval, index: number) {
    event.target.measure(
      (
        _fx: any,
        _fy: any,
        _width: number,
        height: number,
        px: number,
        py: number,
      ) => {
        setMenuPosition({
          x: px,
          y: py + height,
        });

        setSelectedItem(item);
        setOpenMenuIndex(index);
      },
    );
  }

  async function reload() {
    const history = await getHistory();
    const intervals = calculateIntervals(history);

    setData(intervals);
    setBestStreak(getBestStreak(intervals));
    await refresh();
  }

  function handleEdit(item: Interval) {
    setStartDate(new Date(item.startDate));
    setEndDate(item.endDate ? new Date(item.endDate) : null);

    setEditingItem(item);
    setShowModal(true);
  }

  function handleDelete(item: Interval) {
    Alert.alert(
      "Confirmar exclusão",
      "⚠️ Tem certeza que deseja deletar este registro? Essa ação não pode ser desfeita 😞",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            await deleteSobriety(item.id);
            await reload();
            setOpenMenuIndex(null);
          },
        },
      ],
    );
  }

  async function handleAddInterval() {
    if (!startDate) return;

    if (endDate && endDate < startDate) {
      alert("⚠️ Data final inválida 😞");
      return;
    }

    try {
      setLoading(true);

      const history = await getHistory();

      if (editingItem) {
        if (hasOverlap(startDate, endDate, history, editingItem.id)) {
          alert("⚠️ Esse período conflita com outro registro 😞");
          return;
        }

        await editSobriety(
          editingItem.id,
          startDate.toISOString(),
          endDate?.toISOString(),
        );
      } else {
        if (hasOverlap(startDate, endDate, history)) {
          alert("⚠️ Esse período conflita com outro registro 😞");
          return;
        }

        await addSobriety(startDate.toISOString(), endDate?.toISOString());
      }

      handleClose();
      await reload();
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmRelapse() {
    if (!relapseDate || !editingItem) return;

    if (new Date(relapseDate) < new Date(editingItem.startDate)) {
      alert("⚠️ A recaída não pode ser antes do início 😞");
      return;
    }

    await editSobriety(
      editingItem.id,
      editingItem.startDate,
      new Date(relapseDate).toISOString(),
    );

    await reload();

    handleCloseRelapse();
  }

  const widthMenu: number = useMemo(() => {
    const size = selectedItem?.endDate ? 100 : 160;
    const adjustedX = Math.min(menuPosition.x, screenWidth - size - 10);

    return adjustedX;
  }, [menuPosition.x, screenWidth, selectedItem?.endDate]);

  const isNewJourney = useMemo(() => {
    const hasNoData = data.length === 0;
    const hasNoActiveInterval = data.every((i) => i.endDate);

    return hasNoData || hasNoActiveInterval;
  }, [data]);

  const enabledEndDate = useMemo(() => {
    const isEditing = !!editingItem;
    const hasEndDate = !!endDate;

    const canEditEndDate = isEditing ? hasEndDate : true;

    return canEditEndDate && !isNewJourney;
  }, [editingItem, endDate, isNewJourney]);

  function handleRelapse(item: Interval) {
    setEditingItem(item);
    setShowRelapseModal(true);
  }

  function handleClose() {
    setEditingItem(null);
    setStartDate(null);
    setEndDate(null);
    setShowModal(false);
    setOpenMenuIndex(null);
  }

  function handleCloseRelapse() {
    setEditingItem(null);
    setRelapseDate(null);
    setShowRelapseModal(false);
    setOpenMenuIndex(null);
  }

  return (
    <>
      <Container>
        <Title>
          🏆 Maior tempo limpo: {bestStreak} dia{bestStreak > 1 ? "s" : ""}
        </Title>
        <AddButton onPress={() => setShowModal(true)}>
          <Ionicons name={"add"} size={30} color={colors.primary} />
        </AddButton>
        <ScrollContainer>
          {data.map((item, index) => (
            <Card key={index}>
              <MenuButton onPress={(e) => handleOpenMenu(e, item, index)}>
                <Ionicons name="ellipsis-vertical" size={18} color="#fff" />
              </MenuButton>

              <CardTitleWrapper>
                <CardTitle>{formatPeriod(item)}</CardTitle>
              </CardTitleWrapper>

              <Subtitle>
                Ficou limpo por {item.daysClean} dia
                {item.daysClean > 1 ? "s" : ""}
              </Subtitle>
            </Card>
          ))}
        </ScrollContainer>

        <CustomModal
          visible={showModal}
          onClose={handleClose}
          onConfirm={handleAddInterval}
          disableConfirm={!startDate || (enabledEndDate && !endDate)}
          loading={loading}
        >
          <Title>
            {isNewJourney
              ? "👏 Parabéns!\nVamos iniciar uma nova jornada"
              : editingItem
                ? "Editar registro"
                : "Novo registro"}
          </Title>

          <ButtonDate onPress={() => setShowStartPicker(true)}>
            <ButtonText>
              {startDate ? startDate.toLocaleDateString() : "Selecionar início"}
            </ButtonText>
          </ButtonDate>

          {enabledEndDate && (
            <ButtonDate onPress={() => setShowEndPicker(true)}>
              <ButtonText>
                {endDate ? endDate.toLocaleDateString() : "Selecionar fim"}
              </ButtonText>
            </ButtonDate>
          )}
        </CustomModal>
        {showStartPicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);

              if (selectedDate && selectedDate > new Date()) {
                alert("⚠️ Não é possível selecionar uma data futura 😅");
                return;
              }

              if (event.type === "dismissed") return;

              if (selectedDate) {
                setStartDate(selectedDate);
              }
            }}
          />
        )}

        {showEndPicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate && selectedDate > new Date()) {
                alert("⚠️ Não é possível selecionar uma data futura 😅");
                return;
              }

              if (event.type === "dismissed") return;

              if (selectedDate) {
                setEndDate(selectedDate);
              }
            }}
          />
        )}

        <CustomModal
          visible={showRelapseModal}
          onClose={handleCloseRelapse}
          onConfirm={handleConfirmRelapse}
          confirmText="Registrar"
          disableConfirm={!relapseDate}
        >
          <Title>Registrar recaída</Title>

          <ButtonDate onPress={() => setShowRelapsePicker(true)}>
            <ButtonText>
              {relapseDate
                ? new Date(relapseDate).toLocaleDateString()
                : "Selecionar data"}
            </ButtonText>
          </ButtonDate>
        </CustomModal>

        {showRelapsePicker && (
          <DateTimePicker
            value={relapseDate || new Date()}
            mode="date"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowRelapsePicker(false);

              if (selectedDate && selectedDate > new Date()) {
                alert("⚠️ Não é possível selecionar uma data futura 😅");
                return;
              }

              if (event.type === "dismissed") return;

              if (selectedDate) {
                setRelapseDate(selectedDate);
              }
            }}
          />
        )}
      </Container>
      {openMenuIndex !== null && (
        <>
          <Overlay onPress={() => setOpenMenuIndex(null)} />

          <MenuContainer
            style={{
              position: "absolute",
              top: menuPosition.y,
              left: widthMenu,
            }}
          >
            <MenuItem onPress={() => selectedItem && handleEdit(selectedItem)}>
              <MenuText>Editar</MenuText>
            </MenuItem>

            <MenuItem
              onPress={() => selectedItem && handleDelete(selectedItem)}
            >
              <MenuText>Deletar</MenuText>
            </MenuItem>

            {!selectedItem?.endDate && (
              <MenuItem
                onPress={() => selectedItem && handleRelapse(selectedItem)}
              >
                <MenuText>Registrar recaída</MenuText>
              </MenuItem>
            )}
          </MenuContainer>
        </>
      )}
    </>
  );
}
