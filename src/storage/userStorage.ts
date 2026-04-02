import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../interfaces/user";

const KEY = "@sobriety:user";

export async function saveUser(data: UserData) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}

export async function getUser(): Promise<UserData | null> {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}
