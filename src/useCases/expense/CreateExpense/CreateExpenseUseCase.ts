import { Expense } from '../../../entities/Expense';

import { IExpenseRepository } from '../../../repositories/expense/IExpenseRepository';
import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';
import { IWalletRepository } from '../../../repositories/wallet/IWalletRepository';
import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';

import { AppError } from '../../../share/AppError';

import { transformPercent } from '../../../util/transformPercent';

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

    private incomeRepository: IIncomeRepository,
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

    const wallet = await this.walletRepository.findByUser(user_id);

    if (!wallet) {
      throw new AppError('Please contact an admin, error in your wallet!', 406);
    }

    const income = await this.incomeRepository.findByUser(user_id);

    if (!income) {
      throw new AppError('as well ? income not exist ? contact an admin', 406);
    }

    const totalCurrentHabits = findHabitsByUser.reduce((acumulator, value) => {
      return acumulator + Number(value.current_spent);
    }, 0);

    if (current_spent + totalCurrentHabits > Number(income.current_money)) {
      throw new AppError(
        `Sorry but you dont't have enough money in your wallet. You reached 100% from you wallet.`,
      );
    }

    if (findOneHabit.category.category === 'Bills') {
      const getBillsSpent = findHabitsByUser.reduce((acumulator, value) => {
        return acumulator + Number(value.current_spent);
      }, 0);

      const percentActualResult = transformPercent(
        getBillsSpent + current_spent,
        Number(wallet.available_money),
      );

      if (percentActualResult >= 98) {
        throw new AppError('Bills cannot overtake 98% of the total budget');
      }
    }

    const availableMoney = Number(wallet.available_money);

    const moneySpent =
      availableMoney > current_spent
        ? availableMoney - current_spent
        : current_spent - availableMoney;

    await this.walletRepository.updateWallet({
      ...wallet,
      available_money: moneySpent,
    });

    await this.habitsRepository.updateSpent({
      ...findOneHabit,
      current_spent,
    });

    const expense = await this.expenseRepository.create({
      note,
      value: current_spent,
      habit_id,
    });

    return expense;
  }
}
