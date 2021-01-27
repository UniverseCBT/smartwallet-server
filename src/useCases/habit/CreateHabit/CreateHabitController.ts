import { Request, Response } from 'express';

import { HabitsRepository } from '../../../repositories/habits/database/HabitsRepository';
import { CategoryRepository } from '../../../repositories/category/database/CategoryRepository';
import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';
import { WalletRepository } from '../../../repositories/wallet/database/WalletRepository';
import { ExpenseRepository } from '../../../repositories/expense/database/ExpenseRepository';

import { CreateHabitUseCase } from './CreateHabitUseCase';

class CreateHabitController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      habit_name,
      importance,
      expected_spent,
      category_id,
    } = request.body;
    const { id } = request.user;

    const habitsRepository = new HabitsRepository();
    const categoryRepository = new CategoryRepository();
    const incomeRepository = new IncomeRepository();
    const walletRepository = new WalletRepository();
    const expenseRepository = new ExpenseRepository();

    const createHabits = new CreateHabitUseCase(
      habitsRepository,
      categoryRepository,
      incomeRepository,
      walletRepository,
      expenseRepository,
    );

    const habit = await createHabits.execute({
      habit_name,
      importance,
      expected_spent,
      category_id,
      user_id: id,
    });

    return response.status(200).json(habit);
  }
}

export default new CreateHabitController();
