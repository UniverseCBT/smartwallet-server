import { AppError } from '../../../share/AppError';

import { IPaycheckRepository } from '../../../repositories/paycheck/IPaycheckRepository';
import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';
import { IHistoricRepository } from '../../../repositories/historic/IHistoricRepository';

interface Request {
  paycheck_id: string;
  user_id: string;
}

export class DeletePaycheckUseCase {
  constructor(
    private paycheckRepository: IPaycheckRepository,

    private incomeRepository: IIncomeRepository,

    private historicRepository: IHistoricRepository,
  ) {}

  public async execute({ paycheck_id, user_id }: Request): Promise<void> {
    const paycheckExist = await this.paycheckRepository.findByPaycheckId(
      paycheck_id,
    );

    if (!paycheckExist) {
      throw new AppError('Paycheck not found', 404);
    }

    const paycheck = await this.paycheckRepository.findPaycheckByUser(
      paycheck_id,
      user_id,
    );

    if (!paycheck) {
      throw new AppError('User does not exist with this paycheck');
    }

    const income = await this.incomeRepository.findByUser(user_id);

    if (!income) {
      throw new AppError('Error! contact an admin to this error', 500);
    }

    const deleteIncome = income.expected_money - paycheck.expected_received;

    await this.incomeRepository.updateExpectedMoney({
      ...income,
      expected_money: deleteIncome,
    });

    await this.historicRepository.create({
      action: 'deleted',
      entity_name: 'paycheck',
      entity: paycheck,
      user: user_id,
    });

    await this.paycheckRepository.delete(paycheck_id);
  }
}
