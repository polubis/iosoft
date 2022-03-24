import { Expense } from '../models';

export class ExpensesService {
  getMany = (): Promise<Expense[]> => {
    return fetch('').then((res) => res.json());
  };
}
