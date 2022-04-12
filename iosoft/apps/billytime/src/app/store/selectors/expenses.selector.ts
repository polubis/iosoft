import { AppState } from '../store';

export const expensesSelector = {
  step: ({ expensesReducer }: AppState) => expensesReducer.step,
  data: ({ expensesReducer }: AppState) =>
    expensesReducer.step === 'loaded' ? expensesReducer.data : [],
};
