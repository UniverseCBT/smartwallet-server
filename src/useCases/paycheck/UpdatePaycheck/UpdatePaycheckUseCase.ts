import { AppError } from '../../../share/AppError';

import { IPaycheckRepository } from '../../../repositories/paycheck/IPaycheckRepository';
import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';

interface Request {
  paycheck_id: string;
  user_id: string;
  wallet?: number;
  name: string;
}

interface Response {
  message: string;
}

export class UpdatePaycheckUseCase {
  constructor(
    private paycheckRepository: IPaycheckRepository,

    private incomeRepository: IIncomeRepository,
  ) {}

  public async execute({
    paycheck_id,
    user_id,
    wallet,
    name,
  }: Request): Promise<Response> {
    const userPaycheckWallet = await this.paycheckRepository.findWallet(
      paycheck_id,
      user_id,
    );

    if (!userPaycheckWallet) {
      throw new AppError('User does not exist with this paycheck');
    }

    const findName = await this.paycheckRepository.findByName(name, user_id);
    const nameExist = findName?.id !== userPaycheckWallet.id && findName;

    if (nameExist) {
      throw new AppError('Paycheck name already exist');
    }

    const userIncome = await this.incomeRepository.findByUser(user_id);

    if (!userIncome) {
      throw new AppError('User does not exist');
    }

    const userTotalWallet = Number(userIncome.expected_wallet);
    const paycheckWallet = Number(userPaycheckWallet.wallet);
    const newWallet = Number(wallet);

    const totalUserLess = userTotalWallet - paycheckWallet;

    const sumNewPaycheckWallet = totalUserLess + newWallet;

    await this.incomeRepository.updateExpectedWallet({
      ...userIncome,
      expected_wallet: sumNewPaycheckWallet || paycheckWallet,
    });

    const containName = name || userPaycheckWallet.name;

    await this.paycheckRepository.update({
      ...userPaycheckWallet,
      name: containName,
      wallet: newWallet || paycheckWallet,
    });

    return {
      message: 'Paycheck updated',
    };
  }
}
