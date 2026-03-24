type BalanceCardProps = {
  income: number;
  expenses: number;
};

export default function BalanceCard({
  income,
  expenses,
}: BalanceCardProps) {
  const balance = income - expenses;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Доход</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">${income}</h2>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Расход</p>
        <h2 className="mt-2 text-2xl font-bold text-red-600">${expenses}</h2>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Баланс</p>
        <h2 className="mt-2 text-2xl font-bold text-green-600">${balance}</h2>
      </div>
    </section>
  );
}