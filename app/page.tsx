"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import { loadBudgets } from "@/lib/storage";
import { formatAmount, getBudgetRemaining, getBudgetSpent } from "@/lib/budget-utils";
import { Budget } from "@/types/budget";

export default function HomePage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    setBudgets(loadBudgets());
  }, []);

  const summary = useMemo(() => {
    const totalIncome = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const totalSpent = budgets.reduce((sum, budget) => sum + getBudgetSpent(budget), 0);
    const totalRemaining = budgets.reduce(
      (sum, budget) => sum + getBudgetRemaining(budget),
      0
    );

    return {
      totalIncome,
      totalSpent,
      totalRemaining,
    };
  }, [budgets]);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Header
          title="Наш бюджет"
          subtitle="Главная страница приложения. Здесь можно быстро посмотреть общую сводку по всем бюджетам."
        />

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <BalanceCard label="Всего бюджетов" value={String(budgets.length)} />
          <BalanceCard label="Общий income" value={formatAmount(summary.totalIncome, "USD")} />
          <BalanceCard
            label="Общий remaining"
            value={formatAmount(summary.totalRemaining, "USD")}
            valueClassName={summary.totalRemaining < 0 ? "text-red-300" : "text-emerald-300"}
          />
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <h2 className="text-2xl font-semibold">Бюджеты</h2>
          <p className="mt-2 text-white/60">
            Перейди на отдельную страницу для управления бюджетами и расходами.
          </p>

          <div className="mt-5">
            <Link
              href="/budgets"
              className="inline-flex rounded-2xl bg-white px-5 py-3 font-semibold text-black"
            >
              Открыть бюджеты
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}