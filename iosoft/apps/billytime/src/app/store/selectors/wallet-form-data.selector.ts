import { createSelector } from '@reduxjs/toolkit';
import { selectWalletCreationStatus } from './general.selector';

export const selectWalletFormDataStatuses = createSelector(
  selectWalletCreationStatus,
  selectWalletCreationStatus,
  (walletCreationStatus) => [walletCreationStatus, walletCreationStatus]
);
