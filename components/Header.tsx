export default function Header() {
  return (
    <header className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Добро пожаловать :3</p>
          <h1 className="text-3xl font-bold text-gray-900">
            Наш бюджет
          </h1>
        </div>

        <div className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white">
          Budget Tracker
        </div>
      </div>
    </header>
  );
}