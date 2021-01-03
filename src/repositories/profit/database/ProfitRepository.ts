import { getRepository } from 'typeorm';

import { Profit } from '../../../entities/Profit';
import { ICreateProfitDTO } from '../../../useCases/income/CreateProfit/ICreateProfitDTO';

export class ProfitRepository {
  private ormRepository = getRepository(Profit);

  public async create(data: ICreateProfitDTO): Promise<Profit> {
    const profit = this.ormRepository.create(data);

    await this.ormRepository.save(profit);

    return profit;
  }
}
