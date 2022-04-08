import { AppState } from '../store';

export const selectWallets = (state: AppState) => state.walletsReducer.wallets;

export const selectExpenses = (state: AppState) =>
  state.expensesReducer.expenses;

export const selectExpenseCreationStatus = (state: AppState) =>
  state.expensesReducer.expenseCreationStatus;

export const selectLoggedInUser = (state: AppState) =>
  state.authorizationReducer.user;

export const selectWalletCreationStatus = (state: AppState) =>
  state.walletsReducer.walletCreationStatus;
