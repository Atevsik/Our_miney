type CategoriesCardProps = {
  items: { name: string; total: number; formatted: string }[];
};

export default function CategoriesCard({ items }: CategoriesCardProps) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Категории</h3>
        <p className="mt-1 text-sm text-white/60">
          Сводка по категориям текущего бюджета
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/25 p-5 text-sm text-white/55">
          Категории появятся после добавления расходов.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((category) => (
            <div
              key={category.name}
              className="rounded-2xl border border-white/10 bg-slate-950/25 p-4"
            >
              <div className="text-sm text-white/55">{category.name}</div>
              <div className="mt-2 text-xl font-semibold">{category.formatted}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}