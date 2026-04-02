import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants/storage";
import { History } from "../interfaces/histoty";

export async function getCurrentSobriety(): Promise<string | null> {
  return await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_SOBRIETY_START);
}

export async function getHistory(): Promise<History[] | []> {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.HISTORY);

  if (data) {
    return JSON.parse(data);
  }

  // for add migrate
  // const lastRelapse = await AsyncStorage.getItem(STORAGE_KEYS.LAST_RELAPSE);

  // if (lastRelapse) {
  //   const migrated = [{ date: lastRelapse }];

  //   await AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(migrated));

  //   return migrated;
  // }

  return [];
}

export async function addRelapse(startDate: string, endDate?: string) {
  const history = await getHistory();

  // const exists = history.some((h) => h.date === date);

  // if (exists) return;

  const updated = [...history, { startDate, endDate }];

  const sorted = updated.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  await AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(sorted));

  const latest = sorted[0]?.startDate;

  if (latest) {
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_SOBRIETY_START, latest);
  }
}
