import { Request, Response } from 'express';

import { ExpenseRepository } from '../../../repositories/expense/database/ExpenseRepository';
import { HabitsRepository } from '../../../repositories/habits/database/HabitsRepository';
import { WalletRepository } from '../../../repositories/wallet/database/WalletRepository';
import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';

import { CreateExpenseUseCase } from './CreateExpenseUseCase';

class CreateExpenseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { note, habit_id, current_spent } = request.body;
    const { id } = request.user;

    const expenseRepository = new ExpenseRepository();
    const habitRepository = new HabitsRepository();
    const walletRepository = new WalletRepository();
    const incomeRepository = new IncomeRepository();

    const createExpenseUseCase = new CreateExpenseUseCase(
      expenseRepository,
      habitRepository,
      walletRepository,
      incomeRepository,
    );

    const expense = await createExpenseUseCase.execute({
      note,
      habit_id,
      current_spent,
      user_id: id,
    });

    return response.status(200).json(expense);
  }
}

export default new CreateExpenseController();
