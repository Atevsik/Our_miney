import { Budget, Currency } from "@/types/budget";

export const currencySymbols: Record<Currency, string> = {
  RUB: "₽",
  GEL: "₾",
  USD: "$",
};

export const categoryOptions = [
  "Еда",
  "Транспорт",
  "Подписки",
  "Шопинг",
  "Дом",
  "Развлечения",
  "Здоровье",
  "Другое",
];

export function formatAmount(amount: number, currency: Currency) {
  return (
    new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount) + ` ${currencySymbols[currency]}`
  );
}

export function parseNumber(value: string) {
  return Number(value.replace(",", "."));
}

export function getBudgetSpent(budget: Budget) {
  return budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function getBudgetRemaining(budget: Budget) {
  return budget.amount - getBudgetSpent(budget);
}

export function getCategoryTotals(budget: Budget) {
  const map = new Map<string, number>();

  for (const expense of budget.expenses) {
    const key = expense.category?.trim() || "Другое";
    map.set(key, (map.get(key) ?? 0) + expense.amount);
  }

  return Array.from(map.entries())
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);
}