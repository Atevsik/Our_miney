export type Currency = "RUB" | "GEL" | "USD";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category?: string;
  expenseDate: string; // YYYY-MM-DD
  createdAt: string;
};

export type Budget = {
  id: string;
  name: string;
  amount: number;
  currency: Currency;
  expenses: Expense[];
  createdAt: string;
  updatedAt: string;
};