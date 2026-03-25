import { Expense, Currency } from "@/types/budget";
import { formatAmount } from "@/lib/budget-utils";

type ExpensesListProps = {
  expenses: Expense[];
  currency: Currency;
  editingExpenseId: string | null;
  editTitle: string;
  editAmount: string;
  editCategory: string;
  editDate: string;
  categories: string[];
  onEditStart: (expense: Expense) => void;
  onEditCancel: () => void;
  onEditSave: (expenseId: string) => void;
  onDelete: (expenseId: string) => void;
  onEditTitleChange: (value: string) => void;
  onEditAmountChange: (value: string) => void;
  onEditCategoryChange: (value: string) => void;
  onEditDateChange: (value: string) => void;
};

export default function ExpensesList({
  expenses,
  currency,
  editingExpenseId,
  editTitle,
  editAmount,
  editCategory,
  editDate,
  categories,
  onEditStart,
  onEditCancel,
  onEditSave,
  onDelete,
  onEditTitleChange,
  onEditAmountChange,
  onEditCategoryChange,
  onEditDateChange,
}: ExpensesListProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Список расходов</h3>
        <p className="mt-1 text-sm text-white/60">{expenses.length} записей</p>
      </div>

      {expenses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/25 p-5 text-sm text-white/55">
          Пока нет расходов. Добавь первый.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {expenses.map((expense) => {
            const isEditing = editingExpenseId === expense.id;

            return (
              <div
                key={expense.id}
                className="rounded-2xl border border-white/10 bg-slate-950/25 p-4"
              >
                {isEditing ? (
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => onEditTitleChange(e.target.value)}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none focus:border-sky-300/60"
                    />

                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editAmount}
                        onChange={(e) => onEditAmountChange(e.target.value)}
                        className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none focus:border-sky-300/60"
                      />

                      <select
                        value={editCategory}
                        onChange={(e) => onEditCategoryChange(e.target.value)}
                        className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none focus:border-sky-300/60"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => onEditDateChange(e.target.value)}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none focus:border-sky-300/60"
                    />

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => onEditSave(expense.id)}
                        className="rounded-2xl bg-emerald-300 px-4 py-2 font-medium text-slate-950 hover:bg-emerald-200"
                      >
                        Сохранить
                      </button>

                      <button
                        type="button"
                        onClick={onEditCancel}
                        className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 font-medium hover:bg-white/15"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="break-words text-base font-medium">
                        {expense.title}
                      </div>
                      <div className="mt-1 text-sm text-white/60">
                        {expense.category || "Другое"} • {expense.expenseDate}
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <div className="text-lg font-semibold">
                        {formatAmount(expense.amount, currency)}
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => onEditStart(expense)}
                          className="text-sm text-sky-200 hover:text-sky-100"
                        >
                          Редактировать
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(expense.id)}
                          className="text-sm text-rose-300 hover:text-rose-200"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}