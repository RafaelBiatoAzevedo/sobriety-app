export function calculateSobrietyTime(date: string | null) {
  if (!date) {
    return {
      years: 0,
      months: 0,
      days: 0,
    };
  }

  const start = new Date(date);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;

    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

    days += lastMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}
