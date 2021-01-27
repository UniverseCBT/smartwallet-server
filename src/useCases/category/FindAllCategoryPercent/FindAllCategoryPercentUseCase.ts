import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';
import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';
import { IWalletRepository } from '../../../repositories/wallet/IWalletRepository';

import { AppError } from '../../../share/AppError';

import { transformPercent } from '../../../util/transformPercent';

interface Request {
  user_id: string;
  category_id: string;
}

interface Response {
  percent: string;
  money: number;
}

export class FindAllCategoryPercentUseCase {
  constructor(
    private habitRepository: IHabitsRepository,

    private incomeRepository: IIncomeRepository,

    private walletRepository: IWalletRepository,
  ) {}

  public async execute({ user_id, category_id }: Request): Promise<Response> {
    const income = await this.incomeRepository.findByUser(user_id);

    if (!income) {
      throw new AppError(
        'Sorry there was an error loading your income, contact an admin.',
        500,
      );
    }

    const wallet = await this.walletRepository.findByUser(user_id);

    if (!wallet) {
      throw new AppError(
        'Sorry there was an error loading your wallet, contact an admin.',
        500,
      );
    }

    const habit = await this.habitRepository.findByCategory(
      user_id,
      category_id,
    );

    const habitData = habit.reduce(
      (acumulator, habitValue) => {
        const availableWalletMoney = Number(wallet.available_money);
        const habitAvailableMoney = Number(habitValue.available);

        Object.assign(acumulator, {
          money: acumulator.money + habitAvailableMoney,
        });

        const transformValueInPercent = transformPercent(
          acumulator.money,
          availableWalletMoney,
        );

        Object.assign(acumulator, {
          percent: `${transformValueInPercent}%`,
        });

        return acumulator;
      },
      {
        money: 0,
        percent: '0%',
      },
    );

    return habitData;
  }
}
