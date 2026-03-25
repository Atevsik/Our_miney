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
    <div className="rounded-[24px] border border-white/10 bg-white/8 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <div className="text-sm text-white/55">{label}</div>
      <div className={`mt-3 text-2xl font-semibold sm:text-3xl ${valueClassName}`}>
        {value}
      </div>
    </div>
  );
}