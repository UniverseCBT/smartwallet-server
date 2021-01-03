import { Habit } from '../../../entities/Habit';

import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';
import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';
import { IWalletRepository } from '../../../repositories/wallet/IWalletRepository';

import { AppError } from '../../../share/AppError';

interface Request {
  habit_name: string;
  importance: number;
  expected_spent: number;
  current_spent?: number;
  category_id: string;
  user_id: string;
}

export class CreateHabitUseCase {
  constructor(
    private habitsRepository: IHabitsRepository,

    private incomeRepository: IIncomeRepository,

    private walletRepository: IWalletRepository,
  ) {}

  public async execute({
    habit_name,
    importance,
    expected_spent,
    current_spent,
    category_id,
    user_id,
  }: Request): Promise<Habit> {
    const category = await this.habitsRepository.findByCategory(
      user_id,
      category_id,
    );

    if (!category) {
      throw new AppError('User or Category does not exist');
    }

    const income = await this.incomeRepository.findByUser(user_id);

    if (!income) {
      throw new AppError('as well ? income not exist ? contact an admin', 500);
    }

    const habits = await this.habitsRepository.findByUser(user_id);

    if (!habits) {
      throw new AppError('No habit found', 404);
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
      throw new AppError('as well ? wallet not exist ? contact an admin', 500);
    }

    if (expected_spent === undefined || expected_spent === null) {
      throw new AppError(`Expected spent cannot be empty`);
    }

    if (current_spent) {
      const totalCurrentHabits = habits.reduce((acumulator, value) => {
        return acumulator + Number(value.current_spent);
      }, 0);

      if (current_spent + totalCurrentHabits > Number(wallet.available_money)) {
        throw new AppError(
          `Sorry but you dont't have enough money in your wallet. You reached 100% from you wallet.`,
        );
      }

      const isBills = category.find(bills => {
        return bills.category.category === 'Bills';
      });

      if (isBills) {
        const getBillsTotal = category.reduce((acumulator, value) => {
          return acumulator + Number(value.current_spent);
        }, 0);

        const percentBillsResult = Math.ceil(
          (getBillsTotal * 100) / Number(wallet.available_money),
        );
        const percentActualResult = Math.ceil(
          (current_spent * 100) / wallet.available_money,
        );

        if (percentBillsResult + percentActualResult > 98) {
          throw new AppError('Bills cannot overtake 98% of the total budget');
        }
      }

      const availableMoney = Number(wallet.available_money);

      const moneySpent = current_spent - availableMoney;

      await this.walletRepository.updateWallet({
        ...wallet,
        available_money: moneySpent,
      });
    }

    const habit = await this.habitsRepository.create({
      habit_name,
      importance,
      expected_spent,
      current_spent,
      category_id,
      user_id,
    });

    return habit;
  }
}
