import { AppError } from '../../../share/AppError';

import { IPaycheckRepository } from '../../../repositories/paycheck/IPaycheckRepository';
import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';

interface Request {
  paycheck_id: string;
  user_id: string;
  expected_received?: number;
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
    expected_received,
    name,
  }: Request): Promise<Response> {
    const paycheck = await this.paycheckRepository.findPaycheckByUser(
      paycheck_id,
      user_id,
    );

    if (!paycheck) {
      throw new AppError('User does not exist with this paycheck');
    }

    const findName = await this.paycheckRepository.findByName(name, user_id);

    const nameExist = findName?.id !== paycheck.id && findName;

    if (nameExist) {
      throw new AppError('Paycheck name already exist');
    }

    const income = await this.incomeRepository.findByUser(user_id);

    if (!income) {
      throw new AppError('User does not exist');
    }

    const incomeExpectedMoney = Number(income.expected_money);
    const expectedPaycheckReceived = Number(paycheck.expected_received);
    const newWallet = Number(expected_received);

    const totalUserLess = incomeExpectedMoney - expectedPaycheckReceived;

    const sumNewPaycheckWallet = totalUserLess + newWallet;

    await this.incomeRepository.updateExpectedMoney({
      ...income,
      expected_money: sumNewPaycheckWallet || expectedPaycheckReceived,
    });

    const containName = name || paycheck.name;

    await this.paycheckRepository.update({
      ...paycheck,
      name: containName,
      expected_received: newWallet || expectedPaycheckReceived,
    });

    return {
      message: 'Paycheck updated',
    };
  }
}
