import { saveRelapseDate } from "@/src/storage/sobrietyStorage";
import { saveUser } from "@/src/storage/userStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";

import { ADDICTION_OPTIONS } from "@/src/constants/addictionOptions";
import {
  Button,
  ButtonDate,
  ButtonText,
  Card,
  Container,
  DropdownButton,
  Input,
  OptionItem,
  OptionsList,
  OptionText,
  Title,
} from "./onboarding.styles";

export default function Onboarding() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [addiction, setAddiction] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const isDisabled = !name || !startDate || !addiction;

  async function handleSubmit() {
    if (!startDate || !addiction) return;

    await saveUser({
      name,
      startDate: startDate.toISOString(),
      addiction: addiction,
    });

    await saveRelapseDate(startDate.toISOString());

    router.replace("/");
  }

  return (
    <Container>
      <Card>
        <Title>Bem-vindo 👋</Title>

        <Input placeholder="Seu nome" value={name} onChangeText={setName} />

        <ButtonDate onPress={() => setShowDatePicker(true)}>
          <ButtonText>
            {startDate
              ? startDate.toLocaleDateString()
              : "Selecionar data de início"}
          </ButtonText>
        </ButtonDate>

        {showDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}

        <DropdownButton onPress={() => setShowOptions(!showOptions)}>
          <ButtonText>
            {addiction
              ? ADDICTION_OPTIONS.find((o) => o.value === addiction)?.label
              : "Selecionar tipo de vício"}
          </ButtonText>
        </DropdownButton>

        {showOptions && (
          <OptionsList>
            {ADDICTION_OPTIONS.map((option) => (
              <OptionItem
                key={option.value}
                onPress={() => {
                  setAddiction(option.value);
                  setShowOptions(false);
                }}
              >
                <OptionText>{option.label}</OptionText>
              </OptionItem>
            ))}
          </OptionsList>
        )}

        <Button onPress={handleSubmit} disabled={isDisabled}>
          <ButtonText>Começar</ButtonText>
        </Button>
      </Card>
    </Container>
  );
}
