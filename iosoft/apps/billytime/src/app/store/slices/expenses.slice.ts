import { Expense } from '@iosoft/billytime-core';
import { next, State } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ExpensesState =
  | State<'idle'>
  | State<'loading'>
  | State<'loaded', Expense[]>
  | State<'loadFail'>;

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: <ExpensesState>{ step: 'idle' },
  reducers: {
    idle: (state) => next(state, 'idle'),
    loading: (state) => next(state, 'loading', 'idle'),
    loaded: (state, { payload }: PayloadAction<Expense[]>) =>
      next(state, 'loaded', 'loading', payload),
    loadFail: (state) => next(state, 'loadFail', 'loading'),
  },
});
