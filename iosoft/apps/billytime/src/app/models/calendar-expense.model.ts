import { Expense, Wallet } from '@iosoft/billytime-core';

export interface CalendarExpense extends Omit<Expense, 'walletId'> {
  wallet: Wallet;
}
