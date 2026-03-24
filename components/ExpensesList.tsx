import type { Expense } from "@/app/page";

type ExpensesListProps = {
  expenses: Expense[];
};

export default function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
        <span className="text-sm text-gray-500">{expenses.length} items</span>
      </div>

      <div className="mt-4 space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
          >
            <div>
              <h3 className="font-medium text-gray-900">{expense.title}</h3>
              <p className="text-sm text-gray-500">
                {expense.category} • {expense.date}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-900">${expense.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}