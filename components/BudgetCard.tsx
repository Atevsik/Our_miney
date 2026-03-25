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
    <div className="rounded-[24px] border border-white/10 bg-white/8 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold sm:text-2xl">{budget.name}</h3>

          <div className="mt-4 space-y-2">
            <p className="text-sm text-white/70">
              Доход: {formatAmount(budget.amount, budget.currency)}
            </p>
            <p className="text-sm text-white/70">
              Расходы: {formatAmount(spent, budget.currency)}
            </p>
            <p
              className={`text-sm font-semibold ${
                remaining < 0 ? "text-rose-300" : "text-emerald-300"
              }`}
            >
              Осталось: {formatAmount(remaining, budget.currency)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Link
          href={`/budgets/${budget.id}`}
          className="rounded-2xl bg-sky-300 px-4 py-2.5 text-center font-semibold text-slate-950 hover:bg-sky-200"
        >
          Открыть
        </Link>

        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(budget.id)}
            className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-2.5 font-medium text-rose-200 hover:bg-rose-400/15"
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}