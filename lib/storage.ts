import { Budget, Currency, Expense } from "@/types/budget";

const STORAGE_KEY_V2 = "finance_budgets_v2";
const STORAGE_KEY_V1 = "finance_budgets_v1";

function isCurrency(value: unknown): value is Currency {
  return value === "USD" || value === "RUB" || value === "GEL";
}

export function createBudget(
  name: string,
  amount = 0,
  currency: Currency = "USD"
): Budget {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name,
    amount,
    currency,
    expenses: [],
    createdAt: now,
    updatedAt: now,
  };
}

function normalizeExpense(input: unknown): Expense | null {
  if (!input || typeof input !== "object") return null;

  const raw = input as Record<string, unknown>;
  const amount =
    typeof raw.amount === "number" ? raw.amount : Number(raw.amount ?? 0);

  if (!Number.isFinite(amount)) return null;

  const now = new Date().toISOString();

  return {
    id:
      typeof raw.id === "string" && raw.id
        ? raw.id
        : crypto.randomUUID(),
    title:
      typeof raw.title === "string" && raw.title.trim()
        ? raw.title.trim()
        : "Без названия",
    amount,
    category:
      typeof raw.category === "string" && raw.category.trim()
        ? raw.category.trim()
        : "Другое",
    expenseDate:
      typeof raw.expenseDate === "string" && raw.expenseDate
        ? raw.expenseDate
        : now.slice(0, 10),
    createdAt:
      typeof raw.createdAt === "string" && raw.createdAt
        ? raw.createdAt
        : now,
  };
}

function normalizeBudget(input: unknown): Budget | null {
  if (!input || typeof input !== "object") return null;

  const raw = input as Record<string, unknown>;
  const currency = isCurrency(raw.currency) ? raw.currency : "USD";
  const amount =
    typeof raw.amount === "number" ? raw.amount : Number(raw.amount ?? 0);

  if (!Number.isFinite(amount)) return null;

  const rawExpenses = Array.isArray(raw.expenses) ? raw.expenses : [];
  const expenses = rawExpenses
    .map(normalizeExpense)
    .filter(Boolean) as Expense[];

  const now = new Date().toISOString();

  return {
    id:
      typeof raw.id === "string" && raw.id
        ? raw.id
        : crypto.randomUUID(),
    name:
      typeof raw.name === "string" && raw.name.trim()
        ? raw.name.trim()
        : "Новый бюджет",
    amount,
    currency,
    expenses,
    createdAt:
      typeof raw.createdAt === "string" && raw.createdAt
        ? raw.createdAt
        : now,
    updatedAt:
      typeof raw.updatedAt === "string" && raw.updatedAt
        ? raw.updatedAt
        : now,
  };
}

export function loadBudgets(): Budget[] {
  if (typeof window === "undefined") return [];

  const emptyDefault = [createBudget("Основной бюджет", 3000, "USD")];

  try {
    const rawV2 = localStorage.getItem(STORAGE_KEY_V2);

    if (rawV2) {
      const parsed = JSON.parse(rawV2);

      if (Array.isArray(parsed)) {
        const normalized = parsed
          .map(normalizeBudget)
          .filter(Boolean) as Budget[];

        if (normalized.length > 0) return normalized;
      }
    }

    const rawV1 = localStorage.getItem(STORAGE_KEY_V1);

    if (rawV1) {
      const parsed = JSON.parse(rawV1);

      if (Array.isArray(parsed)) {
        const migrated = parsed
          .map(normalizeBudget)
          .filter(Boolean) as Budget[];

        if (migrated.length > 0) return migrated;
      }
    }
  } catch {
    return emptyDefault;
  }

  return emptyDefault;
}

export function saveBudgets(budgets: Budget[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(budgets));
}