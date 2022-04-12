import { AuthorizedUser, LogInFormData } from '@iosoft/billytime-core';
import { next, State } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthorizationState =
  | State<'idle'>
  | State<'authorizing'>
  | State<'authorized', AuthorizedUser>
  | State<'authorizeFail'>;

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: <AuthorizationState>{ step: 'idle' },
  reducers: {
    authorizing: (state, { payload }: PayloadAction<LogInFormData>) =>
      next(state, 'authorizing', 'idle'),
    authorized: (state, { payload }: PayloadAction<AuthorizedUser>) =>
      next(state, 'authorized', 'authorizing', payload),
    authorizeFail: (state) => next(state, 'authorizeFail', 'authorizing'),
  },
});
