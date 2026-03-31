import { SobrietyProvider } from "@/src/context/sobriety/SobrietyContext";
import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../src/theme/theme";

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <SobrietyProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              headerShown: true,
              title: "Registrar recaída",
            }}
          />
        </Stack>
      </SobrietyProvider>
    </ThemeProvider>
  );
}
