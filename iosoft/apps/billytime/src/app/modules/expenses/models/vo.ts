import { Expense, ExpenseCategory } from './interfaces';

export class CostVo {
  constructor(public value: number) {
    if (value <= 0) {
      throw new Error('[INVALID_COST] Cost must be greater than 0');
    }
  }
}

export class BalanceVo {
  constructor(public value: number) {
    if (value < 0) {
      throw new Error('[INVALID_BALANCE] Balance must be greater or equal 0');
    }
  }
}

export class CurrencyVo {
  constructor(public value: '$' | 'zł' | 'euro') {}
}

export class ExpenseVo
  implements Omit<Expense, 'cost' | 'date' | 'currency' | 'balance'>
{
  constructor(
    public id: number,
    public name: string,
    public category: ExpenseCategory,
    public cost: CostVo,
    public date: Date,
    public balance: BalanceVo,
    public currency: CurrencyVo,
    public description?: string
  ) {}
}
