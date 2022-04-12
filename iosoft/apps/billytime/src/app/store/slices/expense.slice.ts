import {
  Expense,
  ExpenseFormData,
  EditExpenseFormData,
} from '@iosoft/billytime-core';
import { State, next } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ExpenseState =
  | State<'idle'>
  | State<'create', ExpenseFormData>
  | State<'creating', ExpenseFormData>
  | State<'created', Expense>
  | State<'createFail', ExpenseFormData>
  | State<'edit', EditExpenseFormData>
  | State<'editing', EditExpenseFormData>
  | State<'edited', Expense>
  | State<'editFail', EditExpenseFormData>;

export const expenseSlice = createSlice({
  name: 'expense',
  reducers: {
    idle: (state) => next(state, 'idle'),
    create: (state, { payload }: PayloadAction<ExpenseFormData>) => {
      next(state, 'create', 'idle', payload);
    },
    creating: (state, { payload }: PayloadAction<ExpenseFormData>) => {
      next(state, 'creating', 'create', payload);
    },
    created: (state, { payload }: PayloadAction<Expense>) => {
      next(state, 'created', 'creating', payload);
    },
    createFail: (state, { payload }: PayloadAction<ExpenseFormData>) => {
      next(state, 'createFail', 'creating', payload);
    },
    edit: (state, { payload }: PayloadAction<EditExpenseFormData>) => {
      next(state, 'edit', 'idle', payload);
    },
    editing: (state, { payload }: PayloadAction<EditExpenseFormData>) => {
      next(state, 'editing', 'edit', payload);
    },
    edited: (state, { payload }: PayloadAction<Expense>) => {
      next(state, 'edited', 'editing', payload);
    },
    editFail: (state, { payload }: PayloadAction<EditExpenseFormData>) => {
      next(state, 'editFail', 'editing', payload);
    },
  },
  initialState: <ExpenseState>{ step: 'idle' },
});
