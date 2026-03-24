type BalanceCardProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

export default function BalanceCard({
  label,
  value,
  valueClassName = "",
}: BalanceCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
      <div className="text-sm text-white/45">{label}</div>
      <div className={`mt-2 text-2xl font-semibold ${valueClassName}`}>
        {value}
      </div>
    </div>
  );
}