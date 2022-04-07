import { Wallet } from '@iosoft/billytime-core';
import { Done, Fail, Idle, Pending, State } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpensesState {
  wallets: State<Wallet[]>;
}

const initialState: ExpensesState = {
  wallets: Idle(),
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
  },
});
