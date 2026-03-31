import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@sobriety:lastRelapse";

export async function saveRelapseDate(date: string) {
  await AsyncStorage.setItem(KEY, date);
}

export async function getRelapseDate(): Promise<string | null> {
  return await AsyncStorage.getItem(KEY);
}
