"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import AddExpenseForm from "@/components/AddExpenseForm";
import ExpensesList from "@/components/ExpensesList";
import CategoriesCard from "@/components/CategoriesCard";

export type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
};

const initialExpenses: Expense[] = [
  {
    id: 1,
    title: "Coffee",
    amount: 12,
    category: "Food",
    date: "2026-03-24",
  },
  {
    id: 2,
    title: "Taxi",
    amount: 25,
    category: "Transport",
    date: "2026-03-23",
  },
  {
    id: 3,
    title: "Netflix",
    amount: 15,
    category: "Subscriptions",
    date: "2026-03-22",
  },
];

const income = 2500;

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const categories = useMemo(() => {
    const totals: Record<string, number> = {};

    expenses.forEach((expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    });

    return Object.entries(totals).map(([name, total]) => ({
      name,
      total,
    }));
  }, [expenses]);

  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    const expenseToAdd: Expense = {
      id: Date.now(),
      ...newExpense,
    };

    setExpenses((prev) => [expenseToAdd, ...prev]);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Header />
        <BalanceCard income={income} expenses={totalExpenses} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </div>

          <div className="lg:col-span-2">
            <ExpensesList expenses={expenses} />
          </div>
        </div>

        <CategoriesCard categories={categories} />
      </div>
    </main>
  );
}