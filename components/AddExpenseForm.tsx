type AddExpenseFormProps = {
  title: string;
  amount: string;
  category: string;
  expenseDate: string;
  categories: string[];
  onTitleChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function AddExpenseForm({
  title,
  amount,
  category,
  expenseDate,
  categories,
  onTitleChange,
  onAmountChange,
  onCategoryChange,
  onDateChange,
  onSubmit,
}: AddExpenseFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl"
    >
      <h3 className="text-xl font-semibold">Добавить расход</h3>
      <p className="mt-1 text-sm text-white/55">
        Новый расход попадёт внутрь выбранного бюджета.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/65">Название</span>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Например: Продукты"
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-white/25 focus:border-white/30"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/65">Сумма</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="Введите сумму"
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-white/25 focus:border-white/30"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/65">Категория</span>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-white/30"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/65">Дата расхода</span>
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-white/30"
          />
        </label>

        <button
          type="submit"
          className="rounded-2xl bg-white px-5 py-3 font-semibold text-black"
        >
          Добавить расход
        </button>
      </div>
    </form>
  );
}