import { AuthorizedUser } from '@iosoft/billytime-core';
import { AppState } from '../store';

export const authorizationSelector = {
  step: ({ authorizationReducer }: AppState) => authorizationReducer.step,
  data: ({ authorizationReducer }: AppState): AuthorizedUser | null =>
    authorizationReducer.step === 'authorized'
      ? authorizationReducer.data
      : null,
};
