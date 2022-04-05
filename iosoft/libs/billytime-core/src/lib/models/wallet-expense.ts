import { Expense } from './expense';
import { Id } from './general';

export interface WalletExpense extends Expense {
    walletId: Id;
}
