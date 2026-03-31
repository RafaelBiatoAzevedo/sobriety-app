import { createContext, useContext, useEffect, useState } from "react";
import { getRelapseDate, saveRelapseDate } from "../../storage/sobrietyStorage";
import { calculateSobrietyTime } from "../../utils/date";

interface SobrietyContextData {
  time: {
    years: number;
    months: number;
    days: number;
  };
  registerRelapse: () => Promise<void>;
}

const SobrietyContext = createContext({} as SobrietyContextData);

export function SobrietyProvider({ children }: any) {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  async function load() {
    const stored = await getRelapseDate();
    setTime(calculateSobrietyTime(stored));
  }

  async function registerRelapse() {
    const now = new Date().toISOString();
    await saveRelapseDate(now);
    setTime({
      years: 0,
      months: 0,
      days: 0,
    });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <SobrietyContext.Provider value={{ time, registerRelapse }}>
      {children}
    </SobrietyContext.Provider>
  );
}

export function useSobriety() {
  return useContext(SobrietyContext);
}
