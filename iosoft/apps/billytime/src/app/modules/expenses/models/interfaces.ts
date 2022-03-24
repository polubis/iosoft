export enum ExpenseCategory {
  Food,
  Medication,
}

export interface Expense {
  id: number;
  cost: number;
  name: string;
  category: ExpenseCategory;
  balance: number;
  currency: '$' | 'zł' | 'euro';
  date: string;
  description?: string;
}
