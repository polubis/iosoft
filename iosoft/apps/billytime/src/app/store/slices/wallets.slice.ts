import { Id, Wallet, WalletFormData } from '@iosoft/billytime-core';
import { NState, next } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WalletsState =
  | NState<'idle'>
  | NState<'loading'>
  | NState<'loaded', Wallet[]>
  | NState<'loadFail'>
  | NState<'creating', Wallet[]>
  | NState<'created', Wallet[]>
  | NState<'createFail'>
  | NState<'editing', Wallet[]>
  | NState<'edited', Wallet[]>
  | NState<'editFail'>;

export const walletsSlice = createSlice({
  name: 'wallets',
  reducers: {
    loading: (state) => next(state, 'loading', 'idle'),
    loaded: (state, { payload }: PayloadAction<Wallet[]>) =>
      next(state, 'loaded', 'loading', payload),
    loadFail: (state) => next(state, 'loadFail', 'loading'),
    creating: (state, { payload }: PayloadAction<WalletFormData>) =>
      next(state, 'creating', 'loaded'),
    created: (state, { payload }: PayloadAction<Wallet>) => {
      next(state, 'created', 'creating', (currState) =>
        currState.data.push(payload)
      );
    },
    createFail: (state) => next(state, 'createFail', 'creating'),
    idleCreate: (state) => next(state, 'loaded', 'created'),
    editing: (
      state,
      { payload }: PayloadAction<{ id: Id; data: WalletFormData }>
    ) => next(state, 'editing', 'loaded'),
    edited: (state, { payload }: PayloadAction<Wallet>) =>
      next(state, 'edited', 'editing', (currState) => {
        const idx = currState.data.findIndex((item) => item.id === payload.id);
        currState.data[idx] = payload;
      }),
    editFail: (state) => next(state, 'editFail', 'editing'),
    idleEdit: (state) => next(state, 'loaded', 'edited'),
  },
  initialState: <WalletsState>{ step: 'idle' },
});
