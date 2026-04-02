import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants/storage";
import { UserData } from "../interfaces/user";

export async function saveUser(data: UserData) {
  await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
}

export async function getUser(): Promise<UserData | null> {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
}
