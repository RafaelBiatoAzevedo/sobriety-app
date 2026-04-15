import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { STORAGE_KEYS } from "../constants/storage";
import { History } from "../interfaces/histoty";

export async function getCurrentSobriety(): Promise<string | null> {
  return await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_SOBRIETY_START);
}

export async function getHistory(): Promise<History[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.HISTORY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao buscar history:", error);
    return [];
  }
}

export async function saveHistory(history: History[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error("Erro ao salvar history:", error);
  }
}

export async function addSobriety(startDate: string, endDate?: string) {
  const history = await getHistory();

  const updated = [
    ...history,
    {
      id: uuid.v4().toString(),
      startDate,
      endDate,
    },
  ];

  const sorted = updated.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  await saveHistory(sorted);

  const latest = sorted[0]?.startDate;

  if (latest) {
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_SOBRIETY_START, latest);
  }
}

export async function editSobriety(
  id: string,
  startDate: string,
  endDate?: string,
) {
  const history = await getHistory();

  const updated = history.map((item) =>
    item.id === id ? { ...item, startDate, endDate } : item,
  );

  const sorted = updated.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  await saveHistory(sorted);

  const latest = sorted[0]?.startDate;

  if (latest) {
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_SOBRIETY_START, latest);
  }
}

export async function deleteSobriety(id: string) {
  const history = await getHistory();

  const filtered = history.filter((item) => item.id !== id);

  await saveHistory(filtered);

  const latest = filtered[0]?.startDate;

  if (latest) {
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_SOBRIETY_START, latest);
  } else {
    await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_SOBRIETY_START);
  }
}
