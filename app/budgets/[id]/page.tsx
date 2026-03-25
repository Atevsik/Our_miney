"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AddExpenseForm from "@/components/AddExpenseForm";
import BalanceCard from "@/components/BalanceCard";
import BudgetForm from "@/components/BudgetForm";
import CategoriesCard from "@/components/CategoriesCard";
import ExpensesList from "@/components/ExpensesList";
import Header from "@/components/Header";
import {
  categoryOptions,
  formatAmount,
  getBudgetRemaining,
  getBudgetSpent,
  getCategoryTotals,
  parseNumber,
} from "@/lib/budget-utils";
import { loadBudgets, saveBudgets } from "@/lib/storage";
import { Budget, Currency, Expense } from "@/types/budget";

export default function BudgetDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState<Currency>("USD");

  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Еда");
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("Еда");
  const [editDate, setEditDate] = useState("");

  useEffect(() => {
    const initialBudgets = loadBudgets();
    setBudgets(initialBudgets);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    saveBudgets(budgets);
  }, [budgets, isLoaded]);

  const budget = useMemo(() => {
    return budgets.find((item) => item.id === id) ?? null;
  }, [budgets, id]);

  useEffect(() => {
    if (!isLoaded || !budget) return;

    setBudgetName(budget.name);
    setBudgetAmount(String(budget.amount));
    setBudgetCurrency(budget.currency);
  }, [budget, isLoaded]);

  function updateBudget(updatedBudget: Budget) {
    setBudgets((prev) =>
      prev.map((item) => (item.id === updatedBudget.id ? updatedBudget : item))
    );
  }

  function handleSaveBudget() {
    if (!budget) return;

    const trimmedName = budgetName.trim();
    const parsedAmount = parseNumber(budgetAmount);

    if (!trimmedName) {
      alert("Введите название бюджета");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
      alert("Введите корректную сумму бюджета");
      return;
    }

    updateBudget({
      ...budget,
      name: trimmedName,
      amount: parsedAmount,
      currency: budgetCurrency,
      updatedAt: new Date().toISOString(),
    });
  }

  function handleResetBudget() {
    if (!budget) return;

    setBudgetName(budget.name);
    setBudgetAmount(String(budget.amount));
    setBudgetCurrency(budget.currency);
  }

  function handleAddExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!budget) return;

    const title = expenseTitle.trim();
    const amount = parseNumber(expenseAmount);

    if (!title) {
      alert("Введите название расхода");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Введите корректную сумму расхода");
      return;
    }

    if (!expenseDate) {
      alert("Выбери дату расхода");
      return;
    }

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      title,
      amount,
      category: expenseCategory || "Другое",
      expenseDate,
      createdAt: new Date().toISOString(),
    };

    updateBudget({
      ...budget,
      expenses: [newExpense, ...budget.expenses],
      updatedAt: new Date().toISOString(),
    });

    setExpenseTitle("");
    setExpenseAmount("");
    setExpenseCategory("Еда");
    setExpenseDate(new Date().toISOString().slice(0, 10));
  }

  function handleDeleteExpense(expenseId: string) {
    if (!budget) return;

    updateBudget({
      ...budget,
      expenses: budget.expenses.filter((expense) => expense.id !== expenseId),
      updatedAt: new Date().toISOString(),
    });

    if (editingExpenseId === expenseId) {
      handleCancelEditExpense();
    }
  }

  function handleStartEditExpense(expense: Expense) {
    setEditingExpenseId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(String(expense.amount));
    setEditCategory(expense.category || "Другое");
    setEditDate(expense.expenseDate);
  }

  function handleCancelEditExpense() {
    setEditingExpenseId(null);
    setEditTitle("");
    setEditAmount("");
    setEditCategory("Еда");
    setEditDate("");
  }

  function handleSaveExpense(expenseId: string) {
    if (!budget) return;

    const title = editTitle.trim();
    const amount = parseNumber(editAmount);

    if (!title) {
      alert("Введите название расхода");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Введите корректную сумму расхода");
      return;
    }

    if (!editDate) {
      alert("Выбери дату расхода");
      return;
    }

    updateBudget({
      ...budget,
      expenses: budget.expenses.map((expense) =>
        expense.id === expenseId
          ? {
              ...expense,
              title,
              amount,
              category: editCategory || "Другое",
              expenseDate: editDate,
            }
          : expense
      ),
      updatedAt: new Date().toISOString(),
    });

    handleCancelEditExpense();
  }

  if (isLoaded && !budget) {
    return (
      <main className="min-h-screen w-full text-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            Бюджет не найден
          </div>
        </div>
      </main>
    );
  }

  if (!budget) return null;

  const totalSpent = getBudgetSpent(budget);
  const remaining = getBudgetRemaining(budget);

  const categoryItems = getCategoryTotals(budget).map((item) => ({
    ...item,
    formatted: formatAmount(item.total, budget.currency),
  }));

  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 pb-32 sm:px-6 lg:px-8">
        <Header
          title={budget.name}
          subtitle="Страница выбранного бюджета: настройки, расходы, категории и баланс."
        />

        <div className="mb-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => router.push("/budgets")}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 hover:bg-white/15"
          >
            ← Назад к бюджетам
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 hover:bg-white/15"
          >
            На главную
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <BudgetForm
            budgetName={budgetName}
            budgetAmount={budgetAmount}
            budgetCurrency={budgetCurrency}
            onNameChange={setBudgetName}
            onAmountChange={setBudgetAmount}
            onCurrencyChange={setBudgetCurrency}
            onSave={handleSaveBudget}
            onReset={handleResetBudget}
          />

          <section className="grid gap-4 md:grid-cols-3">
            <BalanceCard
              label="Income"
              value={formatAmount(budget.amount, budget.currency)}
            />
            <BalanceCard
              label="Total spent"
              value={formatAmount(totalSpent, budget.currency)}
            />
            <BalanceCard
              label="Remaining"
              value={formatAmount(remaining, budget.currency)}
              valueClassName={remaining < 0 ? "text-red-300" : "text-emerald-300"}
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
            <AddExpenseForm
              title={expenseTitle}
              amount={expenseAmount}
              category={expenseCategory}
              expenseDate={expenseDate}
              categories={categoryOptions}
              onTitleChange={setExpenseTitle}
              onAmountChange={setExpenseAmount}
              onCategoryChange={setExpenseCategory}
              onDateChange={setExpenseDate}
              onSubmit={handleAddExpense}
            />

            <ExpensesList
              expenses={budget.expenses}
              currency={budget.currency}
              editingExpenseId={editingExpenseId}
              editTitle={editTitle}
              editAmount={editAmount}
              editCategory={editCategory}
              editDate={editDate}
              categories={categoryOptions}
              onEditStart={handleStartEditExpense}
              onEditCancel={handleCancelEditExpense}
              onEditSave={handleSaveExpense}
              onDelete={handleDeleteExpense}
              onEditTitleChange={setEditTitle}
              onEditAmountChange={setEditAmount}
              onEditCategoryChange={setEditCategory}
              onEditDateChange={setEditDate}
            />
          </section>

          <CategoriesCard items={categoryItems} />
        </div>
      </div>
    </main>
  );
}