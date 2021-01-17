import { Habit } from '../../../entities/Habit';

import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';
import { ICategoryRepository } from '../../../repositories/category/ICategoryRepository';
import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';
import { IWalletRepository } from '../../../repositories/wallet/IWalletRepository';
import { IExpenseRepository } from '../../../repositories/expense/IExpenseRepository';

import { AppError } from '../../../share/AppError';

interface Request {
  habit_name: string;
  importance: number;
  expected_spent: number;
  category_id: string;
  user_id: string;
}

export class CreateHabitUseCase {
  constructor(
    private habitsRepository: IHabitsRepository,

    private categoryRepository: ICategoryRepository,

    private incomeRepository: IIncomeRepository,

    private walletRepository: IWalletRepository,

    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute({
    habit_name,
    importance,
    expected_spent,
    category_id,
    user_id,
  }: Request): Promise<Habit> {
    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError(
        'Category not exist ? contact an admin to this error. Thanks!',
        406,
      );
    }

    const income = await this.incomeRepository.findByUser(user_id);

    if (!income) {
      throw new AppError('as well ? income not exist ? contact an admin', 406);
    }

    const habits = await this.habitsRepository.findByUser(user_id);

    if (!habits) {
      throw new AppError('Sorry we not found this habit', 404);
    }

    const totalExpectedHabits = habits.reduce((acumulator, value) => {
      return acumulator + Number(value.expected_spent);
    }, 0);

    if (
      totalExpectedHabits + Number(expected_spent) >
      Number(income.expected_money)
    ) {
      throw new AppError(
        `You can't exceed expected income in the month, create or update a paycheck to create a new habit expected`,
      );
    }

    const wallet = await this.walletRepository.findByUser(user_id);

    if (!wallet) {
      throw new AppError('as well ? wallet not exist ? contact an admin', 406);
    }

    if (expected_spent === undefined || expected_spent === null) {
      throw new AppError(`Expected spent cannot be empty`);
    }

    const habit = await this.habitsRepository.create({
      habit_name,
      importance,
      expected_spent,
      category_id,
      user_id,
    });

    return habit;
  }
}
