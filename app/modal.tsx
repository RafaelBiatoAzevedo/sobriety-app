import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import {
  ButtonCancel,
  ButtonCancelText,
  ButtonPrimary,
  ButtonText,
  Card,
  Container,
  Description,
  Title,
} from "./modal.styles";

export default function Modal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleRelapse() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      Alert.alert("Recaída registrada", "Você pode recomeçar agora 💪");

      router.back();
    }, 800);
  }

  return (
    <>
      <Stack.Screen
        options={{
          presentation: "modal",
          title: "Registrar recaída",
        }}
      />

      <Container>
        <Card>
          <Title>Você recaiu?</Title>

          <Description>
            Registrar uma recaída ajuda a manter seu progresso real e honesto.
          </Description>

          <ButtonPrimary onPress={handleRelapse} disabled={loading}>
            <ButtonText>
              {loading ? "Salvando..." : "Sim, registrar recaída"}
            </ButtonText>
          </ButtonPrimary>

          <ButtonCancel onPress={() => router.back()}>
            <ButtonCancelText>Cancelar</ButtonCancelText>
          </ButtonCancel>
        </Card>
      </Container>
    </>
  );
}
