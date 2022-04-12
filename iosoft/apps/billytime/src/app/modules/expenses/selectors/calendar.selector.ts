import { Id, Wallet } from '@iosoft/billytime-core';
import { createSelector } from '@reduxjs/toolkit';
import { expensesSelector, walletsSelector } from '../../../store';
import { CalendarExpense } from '../models';

export const calendarSelector = {
  data: createSelector(
    expensesSelector.data,
    walletsSelector.data,
    (expenses, wallets): CalendarExpense[] => {
      const walletsRecord = wallets.reduce<Record<Id, Wallet>>(
        (acc, wallet) => ({ ...acc, [wallet.id]: wallet }),
        {}
      );

      return expenses
        .filter((expense) => !!walletsRecord[expense.walletId])
        .map(({ walletId, ...expense }) => ({
          ...expense,
          wallet: walletsRecord[walletId],
        }));
    }
  ),
};
