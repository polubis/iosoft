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

export const createWalletEpic: Epic<AnyAction, AnyAction, AppState> = (
  action$
) =>
  action$.pipe(
    filter(walletAction.creating.match),
    switchMap(({ payload }) =>
      concat(
        walletsService.create(payload).pipe(
          mergeMap((wallet) => {
            const obs$: Observable<AnyAction>[] = [
              of(walletAction.created(wallet)).pipe(
                tap(() => showAlert('Wallet successfully created', 'success'))
              ),
              of(walletsAction.added(wallet)),
            ];
            return concat(...obs$);
          })
        ),
        of(walletAction.idle())
      ).pipe(
        catchError(() => {
          showAlert('Wallet creation failed');
          return of(walletAction.createFail(payload));
        })
      )
    )
  );
