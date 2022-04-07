import { Currency } from './currency.model';
import { Description, Dictionary, Id } from './general.model';

export interface ExpenseCategory extends Dictionary {}

export interface Expense {
  id: Id;
  cost: number;
  name: string;
  category: ExpenseCategory;
  balance: number;
  currency: Currency;
  date: string;
  description: Description;
  walletId: Id;
}

export interface ExpenseFormData {
  name: string;
  date: string;
  cost: number;
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
