import { Wallet } from '@iosoft/billytime-core';
import { State, next } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WalletsState =
  | State<'idle'>
  | State<'loading'>
  | State<'loaded', Wallet[]>
  | State<'loadFail'>;

export const walletsSlice = createSlice({
  name: 'wallets',
  reducers: {
    idle: (state) => next(state, 'idle'),
    loading: (state) => next(state, 'loading', 'idle'),
    loaded: (state, { payload }: PayloadAction<Wallet[]>) =>
      next(state, 'loaded', 'loading', payload),
    loadFail: (state) => next(state, 'loadFail', 'loading'),
    added: (state, { payload }: PayloadAction<Wallet>) =>
      next(state, 'loaded', 'loaded', (currState) =>
        currState.data.push(payload)
      ),
    edited: (state, { payload }: PayloadAction<Wallet>) =>
      next(state, 'loaded', 'loaded', (currState) => {
        const idx = currState.data.findIndex((item) => item.id === payload.id);
        currState.data[idx] = payload;
      }),
  },
  initialState: <WalletsState>{ step: 'idle' },
});
