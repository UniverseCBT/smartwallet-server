import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';
import { Income } from '../../../entities/Income';

import { AppError } from '../../../share/AppError';

interface Request {
  user_id: string;
  wallet: number;
}

export class UpdateUserWalletUseCase {
  constructor(private incomeRepository: IIncomeRepository) {}

  public async execute({ user_id, wallet }: Request): Promise<Income> {
    const userIncome = await this.incomeRepository.findByUser(user_id);

    if (!userIncome) {
      throw new AppError('User does not exist');
    }

    const expectedWallet = Number(userIncome.expected_wallet);

    const sum_paycheck = wallet + expectedWallet;

    await this.incomeRepository.updateExpectedWallet({
      ...userIncome,
      expected_wallet: sum_paycheck,
    });

    return userIncome;
  }
}
