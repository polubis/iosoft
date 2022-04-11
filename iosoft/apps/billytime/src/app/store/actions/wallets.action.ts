import { walletsSlice } from '../slices';

export const {
  loadWallets,
  loadWalletsFail,
  loadedWallets,
  createWallet,
  createdWallet,
  createWalletFail,
  idleCreateWallet,
  editWallet,
  editedWallet,
  editWalletFail,
  idleEditWallet,
} = walletsSlice.actions;
