type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/45">
        Finance App
      </p>

      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-white/65 sm:text-base">
        {subtitle}
      </p>
    </section>
  );
}