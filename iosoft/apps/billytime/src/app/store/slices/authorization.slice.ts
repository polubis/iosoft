import { LoggedInUser, LogInFormData } from '@iosoft/billytime-core';
import { Done, Fail, Idle, Pending, State } from '@iosoft/sm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthorizationState {
  user: State<LoggedInUser>;
}

const initialState: AuthorizationState = {
  user: Idle(),
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logIn: (state, { payload }: PayloadAction<LogInFormData>) => {
      state.user = Pending();
    },
    loggedIn: (state, { payload }: PayloadAction<LoggedInUser>) => {
      state.user = Done(payload);
    },
    logInFail: (state) => {
      state.user = Fail();
    },
  },
});

export const { logIn, loggedIn, logInFail } = authorizationSlice.actions;

export const authorizationReducer = authorizationSlice.reducer;
