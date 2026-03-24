type Category = {
  name: string;
  total: number;
};

type CategoriesCardProps = {
  categories: Category[];
};

export default function CategoriesCard({
  categories,
}: CategoriesCardProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Категории</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="rounded-xl border border-gray-100 p-4"
          >
            <p className="text-sm text-gray-500">{category.name}</p>
            <h3 className="mt-2 text-xl font-bold text-gray-900">
              ${category.total}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}