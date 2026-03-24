"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import BudgetCard from "@/components/BudgetCard";
import { createBudget, loadBudgets, saveBudgets } from "@/lib/storage";
import { Budget } from "@/types/budget";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    setBudgets(loadBudgets());
  }, []);

  useEffect(() => {
    if (budgets.length > 0) {
      saveBudgets(budgets);
    }
  }, [budgets]);

  function handleAddBudget() {
    const newBudget = createBudget(`Бюджет ${budgets.length + 1}`, 0, "USD");
    setBudgets((prev) => [...prev, newBudget]);
  }

  function handleDeleteBudget(id: string) {
    if (budgets.length === 1) {
      alert("Нельзя удалить единственный бюджет");
      return;
    }

    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Header
          title="Бюджеты"
          subtitle="Отдельная страница со всеми бюджетами. Здесь видно доход, расходы и остаток."
        />

        <div className="mb-6">
          <button
            type="button"
            onClick={handleAddBudget}
            className="rounded-2xl bg-white px-5 py-3 font-semibold text-black"
          >
            + Добавить бюджет
          </button>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onDelete={handleDeleteBudget}
            />
          ))}
        </section>
      </div>
    </main>
  );
}