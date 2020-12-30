import { getRepository } from 'typeorm';

import { Expense } from '../../../entities/Expense';
import { IExpenseRepository } from '../IExpenseRepository';

export class ExpenseRepository implements IExpenseRepository {
  private ormRepository = getRepository(Expense);

  public async create(note: string, habit_id: string): Promise<Expense> {
    const expense = this.ormRepository.create({
      notes: note,
      habit_id,
    });

    await this.ormRepository.save(expense);

    return expense;
  }
}
