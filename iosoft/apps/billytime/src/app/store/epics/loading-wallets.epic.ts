import { CURRENCY_DICTIONARY } from '@iosoft/billytime-core';
import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import {
  catchError,
  map,
  of,
  switchMap,
  filter,
  concat,
  mergeMap,
  Observable,
  takeUntil,
} from 'rxjs';
import { expensesService, walletsService } from '../../services';
import { walletsAction, walletAction, expensesAction } from '../actions';
import { AppState } from '../store';

export const loadingWalletsEpic: Epic<AnyAction, AnyAction, AppState> = (
  action$
) => {
  return action$.pipe(
    filter(walletsAction.loading.match),
    switchMap(() =>
      concat(
        of(expensesAction.loading()),
        expensesService.load().pipe(
          map((expenses) => expensesAction.loaded(expenses)),
          catchError(() => of(expensesAction.loadFail()))
        ),
        walletsService.load().pipe(
          mergeMap((wallets) => {
            const obs$: Observable<AnyAction>[] = [
              of(walletsAction.loaded(wallets)),
            ];

            wallets.length === 0 &&
              obs$.push(
                of(
                  walletAction.create({
                    name: 'My first wallet',
                    description: 'My first wallet description',
                    color: '#000',
                    currency: CURRENCY_DICTIONARY[0].value,
                  })
                )
              );

            return concat(...obs$);
          }),
          catchError(() => of(walletsAction.loadFail()))
        )
      )
    )
  );
};
