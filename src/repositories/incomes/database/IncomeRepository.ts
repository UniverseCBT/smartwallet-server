import { getRepository } from 'typeorm';
import { Income } from '../../../entities/Income';

import { IIncomeRepository } from '../IIncomesRepository';

export class IncomeRepository implements IIncomeRepository {
  private ormRepository = getRepository(Income);

  public async create(user_id: string): Promise<Income> {
    const income = this.ormRepository.create({ user_id });

    await this.ormRepository.save(income);

    return income;
  }
}
