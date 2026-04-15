import { History } from "../interfaces/histoty";
import { Interval } from "../interfaces/interval";

export function calculateIntervals(history: History[]): Interval[] {
  return history.map((item) => {
    const start = new Date(item.startDate);
    const end = item.endDate ? new Date(item.endDate) : new Date();

    const diff = end.getTime() - start.getTime();

    const daysClean = Math.floor(diff / (1000 * 60 * 60 * 24));

    return {
      id: item.id,
      startDate: item.startDate,
      endDate: item.endDate,
      daysClean: Math.max(daysClean, 0),
    };
  });
}

export function getBestStreak(intervals: Interval[]): number {
  if (!intervals.length) return 0;

  return Math.max(...intervals.map((i) => i.daysClean));
}
