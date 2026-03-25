type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <section className="mb-6 overflow-hidden rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
      </div>

      <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white/50">
        Finance App
      </p>

      <h1 className="text-3xl font-semibold sm:text-5xl">{title}</h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        {subtitle}
      </p>
    </section>
  );
}