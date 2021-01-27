import { Expense } from '../../../entities/Expense';

import { IExpenseRepository } from '../../../repositories/expense/IExpenseRepository';
import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';
import { IWalletRepository } from '../../../repositories/wallet/IWalletRepository';

import { AppError } from '../../../share/AppError';

interface Request {
  note: string;
  habit_id: string;
  current_spent: number;
  user_id: string;
}

export class CreateExpenseUseCase {
  constructor(
    private expenseRepository: IExpenseRepository,

    private habitsRepository: IHabitsRepository,

    private walletRepository: IWalletRepository,
  ) {}

  public async execute({
    note,
    habit_id,
    current_spent,
    user_id,
  }: Request): Promise<Expense> {
    const findOneHabit = await this.habitsRepository.findByHabit(habit_id);

    if (!findOneHabit) {
      throw new AppError('Sorry we not found this habit', 404);
    }

    const findHabitsByUser = await this.habitsRepository.findByUser(user_id);

    if (!findHabitsByUser) {
      throw new AppError('We found none habit', 404);
    }

    const habit = await this.habitsRepository.findByHabit(habit_id);

    if (!habit) {
      throw new AppError('We found none habit', 404);
    }

    const wallet = await this.walletRepository.findByUser(user_id);

    if (!wallet) {
      throw new AppError('Please contact an admin, error in your wallet!', 406);
    }

    const availableHabit = Number(habit.available);

    if (current_spent > availableHabit) {
      throw new AppError(
        `Your available money to this habits it is not enough`,
      );
    }

    const habitAvailableSpent = Number(findOneHabit.available);

    if (current_spent > habitAvailableSpent) {
      throw new AppError(
        'Withdraw money from another habit or added more available money for this habit',
      );
    }

    const habitMoneySpent =
      availableHabit > current_spent
        ? availableHabit - current_spent
        : current_spent - availableHabit;

    await this.habitsRepository.updateSpent({
      ...habit,
      current_spent,
      available: habitMoneySpent,
    });

    const expense = await this.expenseRepository.create({
      note,
      value: current_spent,
      habit_id,
    });

    const availableMoney = Number(wallet.available_money);
    const moneySpent =
      availableMoney > current_spent
        ? availableMoney - current_spent
        : current_spent - availableMoney;

    await this.walletRepository.updateWallet({
      ...wallet,
      available_money: moneySpent,
    });

    return expense;
  }
}
