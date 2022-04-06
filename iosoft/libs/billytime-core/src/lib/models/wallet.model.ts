import { Currency } from './currency.model';
import { Description, Id } from './general.model';

export interface Wallet {
  id: Id;
  name: string;
  description: Description;
  currency: Currency;
  balance: number;
  color: string;
}

export interface WalletFormData {
  name: Wallet['name'];
  currency: string;
  description: Wallet['description'];
}
