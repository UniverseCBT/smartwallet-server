import { Expense } from '../../entities/Expense';

export interface IExpenseRepository {
  create(note: string, habit_id: string): Promise<Expense>;
}
