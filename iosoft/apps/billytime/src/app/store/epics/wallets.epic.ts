import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { catchError, map, of, switchMap, filter, concat } from 'rxjs';
import { walletsService } from '../../services';
import { createWallet, createdWallet, createWalletFail } from '../actions';
import { AppState } from '../store';

export const walletCreationEpic: Epic<AnyAction, AnyAction, AppState> = (
  action$
) =>
  action$.pipe(
    filter(createWallet.match),
    switchMap(({ payload }) =>
      walletsService.createWallet(payload).pipe(
        map((wallet) => createdWallet(wallet)),
        catchError(() => of(createWalletFail()))
      )
    )
  );
