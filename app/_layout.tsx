import { SobrietyProvider } from "@/src/context/sobriety/SobrietyContext";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { getUser } from "../src/storage/userStorage";
import { theme } from "../src/theme/theme";

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const user = await getUser();

      if (!user) {
        router.replace("/onboarding");
      }

      setLoading(false);
    }

    checkUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SobrietyProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SobrietyProvider>
    </ThemeProvider>
  );
}
