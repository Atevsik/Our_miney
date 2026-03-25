import { Currency } from "@/types/budget";

type BudgetFormProps = {
  budgetName: string;
  budgetAmount: string;
  budgetCurrency: Currency;
  onNameChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (value: Currency) => void;
  onSave: () => void;
  onReset: () => void;
};

export default function BudgetForm({
  budgetName,
  budgetAmount,
  budgetCurrency,
  onNameChange,
  onAmountChange,
  onCurrencyChange,
  onSave,
  onReset,
}: BudgetFormProps) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Настройки бюджета</h2>
        <p className="mt-1 text-sm text-white/60">
          Название, валюта и сумма дохода
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/75">Название бюджета</span>
          <input
            type="text"
            value={budgetName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Например: Личный бюджет"
            className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none placeholder:text-white/30 focus:border-sky-300/60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/75">Валюта</span>
          <select
            value={budgetCurrency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none focus:border-sky-300/60"
          >
            <option value="USD">USD — Доллар</option>
            <option value="GEL">GEL — Лари</option>
            <option value="RUB">RUB — Рубль</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm text-white/75">Доход</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={budgetAmount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="Введите сумму"
            className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 outline-none placeholder:text-white/30 focus:border-sky-300/60"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onSave}
          className="rounded-2xl bg-emerald-300 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-200"
        >
          Сохранить бюджет
        </button>

        <button
          type="button"
          onClick={onReset}
          className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-medium hover:bg-white/15"
        >
          Сбросить изменения
        </button>
      </div>
    </section>
  );
}