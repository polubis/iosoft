import { Id, Wallet } from '@iosoft/billytime-core';
import { isDoneState } from '@iosoft/sm';
import { createSelector } from '@reduxjs/toolkit';
import { CalendarExpense } from '../../models';
import { selectWallets, selectExpenses } from './general.selector';

export const selectCalendarExpenses = createSelector(
  selectWallets,
  selectExpenses,
  (wallets, expenses): CalendarExpense[] => {
    if (isDoneState(expenses) && isDoneState(wallets)) {
      const walletsDict = wallets.data.reduce<Record<Id, Wallet>>(
        (acc, wallet) => ({ ...acc, [wallet.id]: wallet }),
        {}
      );

      return expenses.data.map(
        ({ walletId, ...expense }): CalendarExpense => ({
          ...expense,
          wallet: walletsDict[walletId],
        })
      );
    }

    return [];
  }
);
