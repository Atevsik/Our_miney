type CategoriesCardProps = {
  items: { name: string; total: number; formatted: string }[];
};

export default function CategoriesCard({ items }: CategoriesCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Категории</h3>
        <p className="mt-1 text-sm text-white/55">
          Сводка по категориям текущего бюджета
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-sm text-white/50">
          Категории появятся после добавления расходов.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((category) => (
            <div
              key={category.name}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="text-sm text-white/45">{category.name}</div>
              <div className="mt-2 text-xl font-semibold">
                {category.formatted}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}