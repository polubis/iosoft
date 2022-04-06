import { Wallet } from '@iosoft/billytime-core';
import { Done, Fail, Idle, Pending, State } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpensesState {
  wallets: State<Wallet[]>;
}

const initialState: ExpensesState = {
  wallets: Idle(),
};

const walletsSlice = createSlice({
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
  },
});

export const { loadWallets, loadWalletsFail, loadedWallets } =
  walletsSlice.actions;

export const walletsReducer = walletsSlice.reducer;
