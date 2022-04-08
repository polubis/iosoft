import { walletsSlice } from '../slices';

export const {
  loadWallets,
  loadWalletsFail,
  loadedWallets,
  createWallet,
  createdWallet,
  createWalletFail,
  editWallet,
  editedWallet,
  editWalletFail,
} = walletsSlice.actions;
