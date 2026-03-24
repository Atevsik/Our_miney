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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Список расходов</h3>
        <p className="mt-1 text-sm text-white/55">{expenses.length} записей</p>
      </div>

      {expenses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-sm text-white/50">
          Пока нет расходов. Добавь первый.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {expenses.map((expense) => {
            const isEditing = editingExpenseId === expense.id;

            return (
              <div
                key={expense.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                {isEditing ? (
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => onEditTitleChange(e.target.value)}
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                    />

                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editAmount}
                        onChange={(e) => onEditAmountChange(e.target.value)}
                        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                      />

                      <select
                        value={editCategory}
                        onChange={(e) => onEditCategoryChange(e.target.value)}
                        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
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
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                    />

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => onEditSave(expense.id)}
                        className="rounded-2xl bg-white px-4 py-2 font-medium text-black"
                      >
                        Сохранить
                      </button>

                      <button
                        type="button"
                        onClick={onEditCancel}
                        className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 font-medium"
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
                      <div className="mt-1 text-sm text-white/55">
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
                          className="text-sm text-white/70 hover:text-white"
                        >
                          Редактировать
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(expense.id)}
                          className="text-sm text-red-300 hover:text-red-200"
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