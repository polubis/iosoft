import { Currency } from './currency';
import { Description, Dictionary } from './general';

export interface ExpenseCategory extends Dictionary {}

export interface Expense {
  id: number;
  cost: number;
  name: string;
  category: ExpenseCategory;
  balance: number;
  currency: Currency;
  date: string;
  description: Description;
}

export interface ExpenseFormData {
  name: Expense['name'];
  date: Expense['date'];
  cost: Expense['cost'];
  category: string;
  currency: string;
  description: string;
}

export const EXPENSE_CATEGORIES_DICTIONARY: ExpenseCategory[] = [
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
