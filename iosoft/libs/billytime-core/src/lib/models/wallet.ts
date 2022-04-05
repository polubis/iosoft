import { Currency } from './currency';
import { Description, Id } from './general';

export interface Wallet {
  id: Id;
  name: string;
  description: Description;
  currency: Currency;
  balance: number;
}

export interface WalletFormData {
  name: Wallet['name'];
  currency: string;
  description: Wallet['description'];
}
