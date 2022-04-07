import { expensesSlice } from '../slices';

export const {
  loadExpenses,
  loadExpensesFail,
  loadedExpenses,
  createExpense,
  createdExpense,
  createExpenseFail,
} = expensesSlice.actions;
