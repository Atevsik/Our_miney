"use client";

import Link from "next/link";
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
    <main className="min-h-screen w-full text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 pb-32 sm:px-6 lg:px-8">
        <Header
          title="Бюджеты"
          subtitle="Отдельная страница со всеми бюджетами. Здесь видно доход, расходы и остаток, а также можно открыть нужный бюджет."
        />

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-medium hover:bg-white/15"
            >
              ← На главную
            </Link>

            <button
              type="button"
              onClick={handleAddBudget}
              className="rounded-2xl bg-sky-300 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-200"
            >
              + Добавить бюджет
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/70">
            Всего бюджетов: <span className="font-semibold text-white">{budgets.length}</span>
          </div>
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