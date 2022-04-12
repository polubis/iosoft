import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { catchError, map, of, switchMap, filter } from 'rxjs';
import { authorizationService } from '../../services';
import { authorizationAction } from '../actions';
import { AppState } from '../store';

export const authorizingEpic: Epic<AnyAction, AnyAction, AppState> = (
  action$
) =>
  action$.pipe(
    filter(authorizationAction.authorizing.match),
    switchMap(({ payload }) =>
      authorizationService.logIn(payload).pipe(
        map((user) => authorizationAction.authorized(user)),
        catchError(() => of(authorizationAction.authorizeFail()))
      )
    )
  );
