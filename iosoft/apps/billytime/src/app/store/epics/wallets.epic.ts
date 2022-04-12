import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { catchError, map, of, switchMap, filter, tap, concat } from 'rxjs';
import { walletsService } from '../../services';
import { showAlert } from '../../ui';
import { walletsActions } from '../actions';
import { AppState } from '../store';

export const createWalletEpic: Epic<AnyAction, AnyAction, AppState> = (
  action$
) =>
  action$.pipe(
    filter(walletsActions.creating.match),
    switchMap(({ payload }) =>
      concat(
        walletsService.creating(payload).pipe(
          map((wallet) => walletsActions.created(wallet)),
          tap(() => showAlert('Wallet successfully created', 'success')),
          catchError(() => {
            showAlert('Wallet creation failed');
            return of(walletsActions.createFail());
          })
        ),
        of(walletsActions.idleCreate())
      )
    )
  );

export const editWalletEpic: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    filter(walletsActions.editing.match),
    switchMap(({ payload }) =>
      concat(
        walletsService.editing(payload.data, payload.id).pipe(
          map((wallet) => walletsActions.edited(wallet)),
          tap(() => showAlert('Wallet successfully edited', 'success')),
          catchError(() => {
            showAlert('Wallet edition failed');
            return of(walletsActions.editFail());
          })
        ),
        of(walletsActions.idleEdit())
      )
    )
  );
