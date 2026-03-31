import { useSobriety } from "@/src/context/sobriety/SobrietyContext";
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
  const { registerRelapse } = useSobriety();
  const [loading, setLoading] = useState(false);

  async function handleRelapse() {
    setLoading(true);

    try {
      await registerRelapse();

      setLoading(false);

      Alert.alert("Recaída registrada", "Você pode recomeçar agora 💪");

      router.back();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert("Recaída não registrada", "Tente novamente");
    }
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
