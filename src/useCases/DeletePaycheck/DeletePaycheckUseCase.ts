import { AppError } from '../../share/AppError';

import { IPaycheckRepository } from '../../repositories/paycheck/IPaycheckRepository';
import { IIncomeRepository } from '../../repositories/incomes/IIncomesRepository';

interface Request {
  paycheck_id: string;
  user_id: string;
}

export class DeletePaycheckUseCase {
  constructor(
    private paycheckRepository: IPaycheckRepository,

    private incomeRepository: IIncomeRepository,
  ) {}

  public async execute({ paycheck_id, user_id }: Request): Promise<void> {
    const paycheckExist = await this.paycheckRepository.findByPaycheckId(
      paycheck_id,
    );

    if (!paycheckExist) {
      throw new AppError('Paycheck not found', 404);
    }

    const userPaycheckWallet = await this.paycheckRepository.findWallet(
      paycheck_id,
      user_id,
    );

    if (!userPaycheckWallet) {
      throw new AppError('User does not exist with this paycheck');
    }

    const userIncome = await this.incomeRepository.findByUser(user_id);

    if (!userIncome) {
      throw new AppError('User does not exist');
    }

    const walletLess = userIncome.expected_wallet - userPaycheckWallet.wallet;

    await this.incomeRepository.updateExpectedWallet({
      ...userIncome,
      expected_wallet: walletLess,
    });

    await this.paycheckRepository.delete(paycheck_id);
  }
}
