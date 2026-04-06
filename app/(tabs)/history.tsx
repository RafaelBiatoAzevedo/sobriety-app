import { getHistory } from "@/src/storage/sobrietyStorage";
import { useEffect, useState } from "react";

import {
  AddButton,
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

import { Interval } from "@/src/interfaces/interval";
import { formatPeriod } from "@/src/utils/format";
import { calculateIntervals, getBestStreak } from "@/src/utils/history";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

export default function History() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [data, setData] = useState<Interval[]>([]);
  const { colors } = useTheme();
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    async function load() {
      const history = await getHistory();

      const intervals = calculateIntervals(history);

      setData(intervals);
      setBestStreak(getBestStreak(intervals));
    }

    load();
  }, []);

  function handleEdit(item: any) {
    console.log("edit", item);
  }

  function handleDelete(item: any) {
    console.log("delete", item);
  }

  function handleRelapse(item: any) {
    console.log("relapse", item);
  }

  return (
    <Container>
      {openMenuIndex !== null && (
        <Overlay onPress={() => setOpenMenuIndex(null)} />
      )}
      <Title>
        🏆 Maior tempo limpo: {bestStreak} dia{bestStreak > 1 ? "s" : ""}
      </Title>
      <AddButton>
        <Ionicons name={"add"} size={30} color={colors.primary} />
      </AddButton>
      <ScrollContainer>
        {data.map((item, index) => (
          <Card key={index}>
            <MenuButton
              onPress={() =>
                setOpenMenuIndex(openMenuIndex === index ? null : index)
              }
            >
              <Ionicons name="ellipsis-vertical" size={18} color="#fff" />
            </MenuButton>

            {openMenuIndex === index && (
              <MenuContainer>
                <MenuItem onPress={() => handleEdit(item)}>
                  <MenuText>Editar</MenuText>
                </MenuItem>

                <MenuItem onPress={() => handleDelete(item)}>
                  <MenuText>Deletar</MenuText>
                </MenuItem>

                {!item.endDate && (
                  <MenuItem onPress={() => handleRelapse(item)}>
                    <MenuText>Registrar recaída</MenuText>
                  </MenuItem>
                )}
              </MenuContainer>
            )}

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
    </Container>
  );
}
