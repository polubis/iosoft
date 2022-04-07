import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { catchError, map, of, switchMap, filter } from 'rxjs';
import { authorizationService } from '../../services';
import { logIn, loggedIn, logInFail } from '../actions';
import { AppState } from '../store';

export const logInEpic: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    filter(logIn.match),
    switchMap(({ payload }) =>
      authorizationService.logIn(payload).pipe(
        map((user) => loggedIn(user)),
        catchError(() => of(logInFail()))
      )
    )
  );
