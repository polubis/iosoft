export interface ExpenseCategory {
  id: number;
  label: string;
  value: string;
}

export interface ExpenseCurrency {
  id: number;
  label: string;
  value: string;
}

export interface Expense {
  id: number;
  cost: number;
  name: string;
  category: ExpenseCategory;
  balance: number;
  currency: ExpenseCurrency;
  date: string;
  description: string | null;
}

export type ExpenseFormData = Omit<
  Expense,
  'id' | 'balance' | 'category' | 'description' | 'currency'
> & {
  category: string;
  currency: string;
  description: string;
};

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    id: 0,
    label: 'Food',
    value: 'food',
  },
  {
    id: 1,
    label: 'Car',
    value: 'car',
  },
];

export const EXPENSE_CURRENCY_TYPES: ExpenseCurrency[] = [
  {
    id: 0,
    label: 'Złoty',
    value: 'zł',
  },
  {
    id: 1,
    label: 'Dollar',
    value: '$',
  },
  {
    id: 2,
    label: 'Euro',
    value: 'euro',
  },
];
