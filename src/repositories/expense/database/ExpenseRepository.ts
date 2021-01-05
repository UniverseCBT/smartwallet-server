import { getRepository } from 'typeorm';

import { Expense } from '../../../entities/Expense';
import { ICreateExpenseDTO } from '../../../useCases/expense/CreateExpense/ICreateExpenseDTO';
import { IExpenseRepository } from '../IExpenseRepository';

export class ExpenseRepository implements IExpenseRepository {
  private ormRepository = getRepository(Expense);

  public async create(data: ICreateExpenseDTO): Promise<Expense> {
    const expense = this.ormRepository.create(data);

    await this.ormRepository.save(expense);

    return expense;
  }
}
