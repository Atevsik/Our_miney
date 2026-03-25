"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import { loadBudgets } from "@/lib/storage";
import {
  formatAmount,
  getBudgetRemaining,
  getBudgetSpent,
} from "@/lib/budget-utils";
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

  const topBudgets = useMemo(() => budgets.slice(0, 3), [budgets]);

  return (
    <main className="min-h-screen w-full text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 pb-32 sm:px-6 lg:px-8">
        <Header
          title="Наш бюджет"
          subtitle="Главная страница приложения. Здесь можно быстро посмотреть сводку по бюджетам, расходам и остаткам, а затем перейти к управлению."
        />

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <BalanceCard label="Всего бюджетов" value={String(budgets.length)} />
          <BalanceCard label="Общий доход" value={formatAmount(summary.totalIncome, "USD")} />
          <BalanceCard label="Всего расходов" value={formatAmount(summary.totalSpent, "USD")} />
          <BalanceCard
            label="Общий остаток"
            value={formatAmount(summary.totalRemaining, "USD")}
            valueClassName={summary.totalRemaining < 0 ? "text-rose-300" : "text-emerald-300"}
          />
        </section>

        <section className="mb-6 grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Быстрый обзор</h2>
                <p className="mt-2 max-w-2xl text-white/70">
                  Здесь можно быстро перейти к бюджетам, посмотреть ключевые цифры и открыть нужный бюджет для редактирования расходов.
                </p>
              </div>

              <Link
                href="/budgets"
                className="inline-flex rounded-2xl bg-sky-300 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-200"
              >
                Открыть бюджеты
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                <div className="text-sm text-white/55">Средний бюджет</div>
                <div className="mt-2 text-xl font-semibold">
                  {budgets.length
                    ? formatAmount(summary.totalIncome / budgets.length, "USD")
                    : formatAmount(0, "USD")}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                <div className="text-sm text-white/55">Активных расходов</div>
                <div className="mt-2 text-xl font-semibold">
                  {budgets.reduce((sum, budget) => sum + budget.expenses.length, 0)}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                <div className="text-sm text-white/55">Статус</div>
                <div className="mt-2 text-xl font-semibold text-emerald-300">
                  Всё под контролем
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-300/20 via-sky-300/10 to-amber-300/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-white/55">
              Финансовая цель
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Следи за остатком, а не только за доходом
            </h2>
            <p className="mt-3 text-white/75">
              Самое полезное в приложении — видеть, сколько реально осталось после расходов по каждому бюджету.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/25 p-4">
              <div className="text-sm text-white/55">Текущий общий остаток</div>
              <div
                className={`mt-2 text-3xl font-semibold ${
                  summary.totalRemaining < 0 ? "text-rose-300" : "text-emerald-300"
                }`}
              >
                {formatAmount(summary.totalRemaining, "USD")}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Последние бюджеты</h2>
              <p className="mt-2 text-white/70">
                Быстрый доступ к основным бюджетам прямо с главной страницы.
              </p>
            </div>

            <Link
              href="/budgets"
              className="hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-2 font-medium sm:inline-flex hover:bg-white/15"
            >
              Все бюджеты
            </Link>
          </div>

          {topBudgets.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-slate-950/25 p-5 text-white/60">
              Пока нет бюджетов.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {topBudgets.map((budget) => {
                const spent = getBudgetSpent(budget);
                const remaining = getBudgetRemaining(budget);

                return (
                  <div
                    key={budget.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/25 p-5"
                  >
                    <h3 className="text-xl font-semibold">{budget.name}</h3>

                    <div className="mt-4 space-y-2 text-sm text-white/75">
                      <p>Доход: {formatAmount(budget.amount, budget.currency)}</p>
                      <p>Расходы: {formatAmount(spent, budget.currency)}</p>
                      <p
                        className={
                          remaining < 0 ? "font-semibold text-rose-300" : "font-semibold text-emerald-300"
                        }
                      >
                        Осталось: {formatAmount(remaining, budget.currency)}
                      </p>
                    </div>

                    <Link
                      href={`/budgets/${budget.id}`}
                      className="mt-5 inline-flex rounded-2xl bg-emerald-300 px-4 py-2.5 font-semibold text-slate-950 hover:bg-emerald-200"
                    >
                      Открыть бюджет
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}