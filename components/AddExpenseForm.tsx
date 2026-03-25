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
      className="rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-md"
    >
      <h3 className="text-xl font-semibold">Добавить расход</h3>
      <p className="mt-1 text-sm text-white/60">
        Новый расход попадёт внутрь выбранного бюджета
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/75">Название</span>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Например: Продукты"
            className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none placeholder:text-white/30 focus:border-sky-300/60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/75">Сумма</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="Введите сумму"
            className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none placeholder:text-white/30 focus:border-sky-300/60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/75">Категория</span>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none focus:border-sky-300/60"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/75">Дата расхода</span>
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none focus:border-sky-300/60"
          />
        </label>

        <button
          type="submit"
          className="rounded-2xl bg-sky-300 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-200"
        >
          Добавить расход
        </button>
      </div>
    </form>
  );
}