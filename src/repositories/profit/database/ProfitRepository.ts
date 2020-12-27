import { getRepository } from 'typeorm';

import { Profit } from '../../../entities/Profit';

export class ProfitRepository {
  private ormRepository = getRepository(Profit);

  public async create(note: string, paycheck_id: string): Promise<Profit> {
    const profit = this.ormRepository.create({
      notes: note,
      paycheck_id,
    });

    await this.ormRepository.save(profit);

    return profit;
  }
}
