import { Interval } from "../interfaces/interval";

export function formatDays(days: number) {
  return `${days} dia${days > 1 ? "s" : ""}`;
}

export function getFirstName(fullName: string): string {
  if (!fullName) return "";

  return fullName.trim().split(" ")[0];
}

export function formatPeriod(item: Interval) {
  const start = new Date(item.startDate).toLocaleDateString();
  const end = item.endDate
    ? new Date(item.endDate).toLocaleDateString()
    : "Hoje";

  return `${start} - ${end}`;
}
