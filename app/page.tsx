"use client";

import { useEffect, useMemo, useState } from "react";

type Currency = "RUB" | "GEL" | "USD";

type BudgetItem = {
  id: string;
  name: string;
  amount: number;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "finance_budgets_v1";

const currencySymbols: Record<Currency, string> = {
  RUB: "₽",
  GEL: "₾",
  USD: "$",
};

function formatAmount(amount: number, currency: Currency) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount) + ` ${currencySymbols[currency]}`;
}

function createEmptyBudget(): BudgetItem {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: "Новый бюджет",
    amount: 0,
    currency: "USD",
    createdAt: now,
    updatedAt: now,
  };
}

export default function HomePage() {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [activeBudgetId, setActiveBudgetId] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  const [formName, setFormName] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formCurrency, setFormCurrency] = useState<Currency>("USD");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        const parsed: BudgetItem[] = JSON.parse(raw);

        if (Array.isArray(parsed) && parsed.length > 0) {
          setBudgets(parsed);
          setActiveBudgetId(parsed[0].id);
          setIsLoaded(true);
          return;
        }
      } catch {
        // ignore broken localStorage and create default budget below
      }
    }

    const initialBudget = {
      ...createEmptyBudget(),
      name: "Основной бюджет",
      amount: 3000,
      currency: "USD" as Currency,
    };

    setBudgets([initialBudget]);
    setActiveBudgetId(initialBudget.id);
    setIsLoaded(true);
  }, []);

  const activeBudget = useMemo(() => {
    return budgets.find((budget) => budget.id === activeBudgetId) ?? null;
  }, [budgets, activeBudgetId]);

  useEffect(() => {
    if (!activeBudget) return;

    setFormName(activeBudget.name);
    setFormAmount(String(activeBudget.amount));
    setFormCurrency(activeBudget.currency);
  }, [activeBudget]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
  }, [budgets, isLoaded]);

  function handleAddBudget() {
    const newBudget = {
      ...createEmptyBudget(),
      name: `Бюджет ${budgets.length + 1}`,
    };

    setBudgets((prev) => [...prev, newBudget]);
    setActiveBudgetId(newBudget.id);
    setSaveMessage("");
  }

  function handleSelectBudget(id: string) {
    setActiveBudgetId(id);
    setSaveMessage("");
  }

  function handleSaveBudget() {
    if (!activeBudget) return;

    const trimmedName = formName.trim();
    const parsedAmount = Number(formAmount.replace(",", "."));

    if (!trimmedName) {
      alert("Введите название бюджета");
      return;
    }

    if (Number.isNaN(parsedAmount) || parsedAmount < 0) {
      alert("Введите корректную сумму");
      return;
    }

    const updatedBudget: BudgetItem = {
      ...activeBudget,
      name: trimmedName,
      amount: parsedAmount,
      currency: formCurrency,
      updatedAt: new Date().toISOString(),
    };

    setBudgets((prev) =>
      prev.map((budget) =>
        budget.id === activeBudget.id ? updatedBudget : budget
      )
    );

    setSaveMessage("Сохранено");
    setTimeout(() => setSaveMessage(""), 2000);
  }

  function handleDeleteBudget(id: string) {
    if (budgets.length === 1) {
      alert("Нельзя удалить единственный бюджет");
      return;
    }

    const newBudgets = budgets.filter((budget) => budget.id !== id);
    setBudgets(newBudgets);

    if (activeBudgetId === id) {
      setActiveBudgetId(newBudgets[0].id);
    }

    setSaveMessage("");
  }

  const totalBudgets = budgets.length;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/50">
            Finance App
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Доход / Бюджет
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/65 sm:text-base">
                Добавляй несколько бюджетов, переключайся между ними,
                редактируй суммы и сохраняй данные локально в браузере.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-xs text-white/45">Всего бюджетов</div>
                <div className="mt-1 text-xl font-semibold">{totalBudgets}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-xs text-white/45">Активный</div>
                <div className="mt-1 max-w-[180px] truncate text-xl font-semibold">
                  {activeBudget?.name ?? "—"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid flex-1 gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Бюджеты</h2>
              <button
                type="button"
                onClick={handleAddBudget}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/15"
              >
                + Добавить
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {budgets.map((budget) => {
                const isActive = budget.id === activeBudgetId;

                return (
                  <div
                    key={budget.id}
                    className={`rounded-2xl border p-3 transition ${
                      isActive
                        ? "border-white/30 bg-white/12"
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectBudget(budget.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-base font-medium">
                            {budget.name}
                          </div>
                          <div className="mt-1 text-sm text-white/60">
                            {formatAmount(budget.amount, budget.currency)}
                          </div>
                        </div>

                        {isActive && (
                          <span className="rounded-full border border-white/20 px-2 py-1 text-[10px] uppercase tracking-wide text-white/70">
                            active
                          </span>
                        )}
                      </div>
                    </button>

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="text-sm text-red-300 transition hover:text-red-200"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
            {activeBudget ? (
              <>
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Редактирование бюджета
                    </h2>
                    <p className="mt-1 text-sm text-white/55">
                      Изменения сохраняются в браузере после нажатия на кнопку
                      “Сохранить”.
                    </p>
                  </div>

                  {saveMessage && (
                    <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                      {saveMessage}
                    </div>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm text-white/65">
                      Название бюджета
                    </span>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Например: Личный бюджет"
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition placeholder:text-white/25 focus:border-white/30"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-sm text-white/65">
                      Валюта
                    </span>
                    <select
                      value={formCurrency}
                      onChange={(e) =>
                        setFormCurrency(e.target.value as Currency)
                      }
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-white/30"
                    >
                      <option value="USD">USD — Доллар</option>
                      <option value="GEL">GEL — Лари</option>
                      <option value="RUB">RUB — Рубль</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="text-sm text-white/65">
                      Income / Бюджет
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      placeholder="Введите сумму"
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition placeholder:text-white/25 focus:border-white/30"
                    />
                  </label>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm text-white/45">Текущая сумма</div>
                    <div className="mt-2 text-2xl font-semibold">
                      {formatAmount(
                        Number(formAmount || 0),
                        formCurrency
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm text-white/45">Создан</div>
                    <div className="mt-2 text-base font-medium">
                      {new Date(activeBudget.createdAt).toLocaleString("ru-RU")}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm text-white/45">Обновлён</div>
                    <div className="mt-2 text-base font-medium">
                      {new Date(activeBudget.updatedAt).toLocaleString("ru-RU")}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleSaveBudget}
                    className="rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:opacity-90"
                  >
                    Сохранить
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!activeBudget) return;
                      setFormName(activeBudget.name);
                      setFormAmount(String(activeBudget.amount));
                      setFormCurrency(activeBudget.currency);
                      setSaveMessage("");
                    }}
                    className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-medium transition hover:bg-white/15"
                  >
                    Сбросить изменения
                  </button>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-white/55">
                Выбери бюджет
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}