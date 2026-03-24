import Link from "next/link";
import { Budget } from "@/types/budget";
import {
  formatAmount,
  getBudgetRemaining,
  getBudgetSpent,
} from "@/lib/budget-utils";

type BudgetCardProps = {
  budget: Budget;
  onDelete?: (id: string) => void;
};

export default function BudgetCard({ budget, onDelete }: BudgetCardProps) {
  const spent = getBudgetSpent(budget);
  const remaining = getBudgetRemaining(budget);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold">{budget.name}</h3>
          <p className="mt-2 text-sm text-white/65">
            Доход: {formatAmount(budget.amount, budget.currency)}
          </p>
          <p className="mt-1 text-sm text-white/65">
            Расходы: {formatAmount(spent, budget.currency)}
          </p>
          <p
            className={`mt-1 text-sm font-medium ${
              remaining < 0 ? "text-red-300" : "text-emerald-300"
            }`}
          >
            Осталось: {formatAmount(remaining, budget.currency)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link
          href={`/budgets/${budget.id}`}
          className="rounded-2xl bg-white px-4 py-2 text-center font-medium text-black"
        >
          Открыть
        </Link>

        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(budget.id)}
            className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-2 font-medium text-red-200"
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}