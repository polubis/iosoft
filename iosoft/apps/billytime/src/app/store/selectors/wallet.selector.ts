import { AppState } from '../store';
import { Id, WalletFormData } from '@iosoft/billytime-core';

export const walletSelector = {
  step: ({ walletReducer }: AppState) => walletReducer.step,
  data: ({ walletReducer }: AppState): WalletFormData | null => {
    const { step } = walletReducer;

    if (step === 'create' || step === 'creating' || step === 'createFail') {
      return walletReducer.data;
    }

    if (step === 'edit' || step === 'editing' || step === 'editFail') {
      return walletReducer.data.data;
    }

    return null;
  },
  idToEdit: ({ walletReducer }: AppState): Id => {
    const { step } = walletReducer;

    if (step === 'edit' || step === 'editing' || step === 'editFail') {
      return walletReducer.data.id;
    }

    if (step === 'edited') {
      return walletReducer.data.id;
    }

    return -1;
  },
};
