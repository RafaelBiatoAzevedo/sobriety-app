import { getUser } from "@/src/storage/userStorage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const user = await getUser();

      if (!user) {
        router.replace("/onboarding");
      } else {
        router.replace("/(tabs)");
      }
    }

    load();
  }, []);

  return null;
}
