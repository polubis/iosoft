import { AppState } from '../store';

export const selectWalletsStep = ({ walletsReducer }: AppState) =>
  walletsReducer.step;

export const selectWalletsData = ({ walletsReducer }: AppState) => {
  if (
    walletsReducer.step === 'loaded' ||
    walletsReducer.step === 'creating' ||
    walletsReducer.step === 'created' ||
    walletsReducer.step === 'editing' ||
    walletsReducer.step === 'edited'
  ) {
    return walletsReducer.data;
  }

  return [];
};

export const selectWallets = ({ walletsReducer }: AppState) => walletsReducer;

export const selectExpenses = (state: AppState) =>
  state.expensesReducer.expenses;

export const selectExpenseCreationStatus = (state: AppState) =>
  state.expensesReducer.expenseCreationStatus;

export const selectLoggedInUser = (state: AppState) =>
  state.authorizationReducer.user;

// export const selectWalletCreationStatus = (state: AppState) =>
//   state.walletsReducer.walletCreationStatus;

// export const selectWalletEditStatus = (state: AppState) =>
//   state.walletsReducer.walletEditStatus;
