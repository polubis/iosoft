import {
  Wallet,
  WalletFormData,
  EditWalletFormData,
} from '@iosoft/billytime-core';
import { State, next } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WalletState =
  | State<'idle'>
  | State<'create', WalletFormData>
  | State<'creating', WalletFormData>
  | State<'created', Wallet>
  | State<'createFail', WalletFormData>
  | State<'edit', EditWalletFormData>
  | State<'editing', EditWalletFormData>
  | State<'edited', Wallet>
  | State<'editFail', EditWalletFormData>;

export const walletSlice = createSlice({
  name: 'wallet',
  reducers: {
    idle: (state) => next(state, 'idle'),
    create: (state, { payload }: PayloadAction<WalletFormData>) => {
      next(state, 'create', 'idle', payload);
    },
    creating: (state, { payload }: PayloadAction<WalletFormData>) => {
      next(state, 'creating', 'create', payload);
    },
    created: (state, { payload }: PayloadAction<Wallet>) => {
      next(state, 'created', 'creating', payload);
    },
    createFail: (state, { payload }: PayloadAction<WalletFormData>) => {
      next(state, 'createFail', 'creating', payload);
    },
    edit: (state, { payload }: PayloadAction<EditWalletFormData>) => {
      next(state, 'edit', 'idle', payload);
    },
    editing: (state, { payload }: PayloadAction<EditWalletFormData>) => {
      next(state, 'editing', 'edit', payload);
    },
    edited: (state, { payload }: PayloadAction<Wallet>) => {
      next(state, 'edited', 'editing', payload);
    },
    editFail: (state, { payload }: PayloadAction<EditWalletFormData>) => {
      next(state, 'editFail', 'editing', payload);
    },
  },
  initialState: <WalletState>{ step: 'idle' },
});
