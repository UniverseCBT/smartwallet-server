import { getRepository } from 'typeorm';

import { IIncomeRepository } from '../IIncomesRepository';
import { Income } from '../../../entities/Income';

export class IncomeRepository implements IIncomeRepository {
  private ormRepository = getRepository(Income);

  public async create(user_id: string): Promise<Income> {
    const income = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(income);

    return income;
  }

  public async findByUser(user_id: string): Promise<Income | undefined> {
    const income = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });

    return income;
  }

  public async updateExpectedMoney(incomeData: Income): Promise<Income> {
    const income = await this.ormRepository.save(incomeData);

    return income;
  }
}
