import { getCurrentSobriety } from "@/src/storage/sobrietyStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { calculateSobrietyTime, calculateTotalDays } from "../../utils/date";

interface SobrietyContextData {
  time: {
    years: number;
    months: number;
    days: number;
  };
  totalDays: number;
  registerRelapse: () => Promise<void>;
  refresh: () => Promise<void>;
}

const SobrietyContext = createContext({} as SobrietyContextData);

export function SobrietyProvider({ children }: any) {
  const [totalDays, setTotalDays] = useState(0);

  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  async function refresh() {
    const stored = await getCurrentSobriety();

    if (!stored) return;

    setTime(calculateSobrietyTime(stored));
    setTotalDays(calculateTotalDays(stored));
  }

  async function registerRelapse() {
    setTime({
      years: 0,
      months: 0,
      days: 0,
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SobrietyContext.Provider
      value={{ time, totalDays, registerRelapse, refresh }}
    >
      {children}
    </SobrietyContext.Provider>
  );
}

export function useSobriety() {
  return useContext(SobrietyContext);
}
