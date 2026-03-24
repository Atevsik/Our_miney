"use client";

import { useState } from "react";

type AddExpenseFormProps = {
  onAddExpense: (expense: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => void;
};

export default function AddExpenseForm({
  onAddExpense,
}: AddExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !amount || !date) {
      return;
    }

    onAddExpense({
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    });

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Добавить расход</h2>

      <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название расхода"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />

        <input
          type="number"
          placeholder="Кол-во"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        >
          <option value="Food">Еда</option>
          <option value="Transport">Транспорт</option>
          <option value="Subscriptions">Подписки</option>
          <option value="Shopping">Шоппинг</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />

        <button
          type="submit"
          className="rounded-xl bg-black px-4 py-3 font-medium text-white transition hover:opacity-90"
        >
          Добавить
        </button>
      </form>
    </section>
  );
}