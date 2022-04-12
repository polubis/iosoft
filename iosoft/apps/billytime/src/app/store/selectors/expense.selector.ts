import { AppState } from '../store';
import { ExpenseFormData, Id } from '@iosoft/billytime-core';

export const expenseSelector = {
  step: ({ expenseReducer }: AppState) => expenseReducer.step,
  data: ({ expenseReducer }: AppState): ExpenseFormData | null => {
    const { step } = expenseReducer;

    if (step === 'create' || step === 'creating' || step === 'createFail') {
      return expenseReducer.data;
    }

    if (step === 'edit' || step === 'editing' || step === 'editFail') {
      return expenseReducer.data.data;
    }

    return null;
  },
  idToEdit: ({ expenseReducer }: AppState): Id => {
    const { step } = expenseReducer;

    if (step === 'edit' || step === 'editing' || step === 'editFail') {
      return expenseReducer.data.id;
    }

    if (step === 'edited') {
      return expenseReducer.data.id;
    }

    return -1;
  },
};
