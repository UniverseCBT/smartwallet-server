import { getMongoRepository, MongoRepository } from 'typeorm';

import { Historic } from '../../../schemas/Historic';
import { HistoricDTO } from '../../../useCases/historic/share/HistoricDTO';
import { IHistoricRepository } from '../IHistoricRepository';

export class HistoricRepository implements IHistoricRepository {
  private ormRepository: MongoRepository<Historic>;

  constructor() {
    this.ormRepository = getMongoRepository(Historic, 'mongo');
  }

  public async create(historic: HistoricDTO): Promise<Historic> {
    const data = await this.ormRepository.create(historic);

    await this.ormRepository.save(historic);

    return data;
  }

  public async findAllByUser(user_id: string): Promise<Historic[]> {
    const historicUser = await this.ormRepository.find({
      where: {
        'user.id': { $eq: user_id },
      },
    });

    return historicUser;
  }

  public async findAllByUserDate(
    user_id: string,
    date: string,
  ): Promise<Historic[]> {
    const historicUser = await this.ormRepository.find({
      where: {
        'user.id': { $eq: user_id },
        'user.created_at': { $eq: date },
      },
    });

    return historicUser;
  }
}
