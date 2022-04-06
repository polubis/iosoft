import { Expense, ExpenseFormData } from '@iosoft/billytime-core';
import { Done, Fail, Idle, isDoneState, Pending, State } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpensesState {
  expenses: State<Expense[]>;
  expenseCreationStatus: State<Expense>;
}

const initialState: ExpensesState = {
  expenses: Idle(),
  expenseCreationStatus: Idle(),
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    loadExpenses: (state) => {
      state.expenses = Pending();
    },
    loadedExpenses: (state, { payload }: PayloadAction<Expense[]>) => {
      state.expenses = Done(payload);
    },
    loadExpensesFail: (state) => {
      state.expenses = Fail();
    },
    createExpense: (state, { payload }: PayloadAction<ExpenseFormData>) => {
      state.expenseCreationStatus = Pending();
    },
    createdExpense: (state, { payload }: PayloadAction<Expense>) => {
      state.expenseCreationStatus = Done(payload);

      // TODO REMOTE IT FROM THIS PLACE
      if (isDoneState(state.expenses)) {
        state.expenses.data.push(payload);
      }
    },
    createExpenseFail: (state) => {
      state.expenseCreationStatus = Fail();
    },
  },
});

export const {
  loadExpenses,
  loadExpensesFail,
  loadedExpenses,
  createExpense,
  createdExpense,
  createExpenseFail,
} = expensesSlice.actions;

export const expensesReducer = expensesSlice.reducer;
