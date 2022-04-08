import { Id, Wallet, WalletFormData } from '@iosoft/billytime-core';
import { Done, Fail, Idle, isDoneState, Pending, State } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpensesState {
  wallets: State<Wallet[]>;
  walletCreationStatus: State<Wallet>;
  walletEditStatus: State<Wallet>;
}

const initialState: ExpensesState = {
  wallets: Idle(),
  walletCreationStatus: Idle(),
  walletEditStatus: Idle(),
};

export const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    loadWallets: (state) => {
      state.wallets = Pending();
    },
    loadedWallets: (state, { payload }: PayloadAction<Wallet[]>) => {
      state.wallets = Done(payload);
    },
    loadWalletsFail: (state) => {
      state.wallets = Fail();
    },
    createWallet: (state, { payload }: PayloadAction<WalletFormData>) => {
      state.walletCreationStatus = Pending();
    },
    createdWallet: (state, { payload }: PayloadAction<Wallet>) => {
      state.walletCreationStatus = Done(payload);
      isDoneState(state.wallets) && state.wallets.data.push(payload);
    },
    createWalletFail: (state) => {
      state.walletCreationStatus = Fail();
    },
    editWallet: (
      state,
      { payload }: PayloadAction<{ data: WalletFormData; id: Id }>
    ) => {
      state.walletEditStatus = Pending();
    },
    editedWallet: (state, { payload }: PayloadAction<Wallet>) => {
      state.walletEditStatus = Done(payload);

      if (isDoneState(state.wallets)) {
        const idx = state.wallets.data.findIndex(
          (item) => item.id === payload.id
        );
        state.wallets.data[idx] = payload;
      }
    },
    editWalletFail: (state) => {
      state.walletEditStatus = Fail();
    },
  },
});
