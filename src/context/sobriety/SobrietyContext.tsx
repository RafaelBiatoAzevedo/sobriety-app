import { createContext, useContext, useEffect, useState } from "react";
import { getRelapseDate, saveRelapseDate } from "../../storage/sobrietyStorage";
import { calculateSobrietyTime, calculateTotalDays } from "../../utils/date";

interface SobrietyContextData {
  time: {
    years: number;
    months: number;
    days: number;
  };
  totalDays: number;
  registerRelapse: () => Promise<void>;
}

const SobrietyContext = createContext({} as SobrietyContextData);

export function SobrietyProvider({ children }: any) {
  const [totalDays, setTotalDays] = useState(0);

  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  async function load() {
    const stored = await getRelapseDate();
    setTime(calculateSobrietyTime(stored));
    setTotalDays(calculateTotalDays(stored));
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
    <SobrietyContext.Provider value={{ time, totalDays, registerRelapse }}>
      {children}
    </SobrietyContext.Provider>
  );
}

export function useSobriety() {
  return useContext(SobrietyContext);
}
