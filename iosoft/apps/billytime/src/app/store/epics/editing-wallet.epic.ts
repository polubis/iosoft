import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import {
  catchError,
  of,
  switchMap,
  filter,
  tap,
  concat,
  mergeMap,
  Observable,
} from 'rxjs';
import { walletsService } from '../../services';
import { showAlert } from '../../ui';
import { walletAction, walletsAction } from '../actions';
import { AppState } from '../store';

export const editWalletEpic: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    filter(walletAction.editing.match),
    switchMap(({ payload }) =>
      concat(
        walletsService.edit(payload).pipe(
          mergeMap((wallet) => {
            const obs$: Observable<AnyAction>[] = [
              of(walletAction.edited(wallet)).pipe(
                tap(() => showAlert('Wallet successfully edited', 'success'))
              ),
              of(walletsAction.edited(wallet)),
            ];
            return concat(...obs$);
          })
        ),
        of(walletAction.idle())
      ).pipe(
        catchError(() => {
          showAlert('Wallet edit failed');
          return of(walletAction.editFail(payload));
        })
      )
    )
  );
