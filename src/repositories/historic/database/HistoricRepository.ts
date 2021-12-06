import { getMongoRepository, MongoRepository } from 'typeorm';

import { Historic } from '../../../schemas/Historic';
import { HistoricDTO } from '../../../useCases/historic/share/HistoricDTO';
import { ICheckUserStepDTO } from '../../../useCases/user/CheckUserStep/CheckUserStepDTO';
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
    const historicResponse = await this.ormRepository.find({
      where: {
        user: { $eq: user_id },
      },
    });

    return historicResponse;
  }

  public async findAllByUserDate(
    user_id: string,
    startMonth: Date,
    endMonth: Date,
  ): Promise<Historic[]> {
    const historicUser = await this.ormRepository.find({
      where: {
        user: { $eq: user_id },
        created_at: { $gte: startMonth, $lte: endMonth },
      },
      order: {
        created_at: 'DESC',
      },
    });

    return historicUser;
  }

  public async findFirstByUserAction({
    user_id,
    entity,
  }: ICheckUserStepDTO): Promise<Historic | undefined> {
    const historic = await this.ormRepository.findOne({
      where: {
        user: { $eq: user_id },
        entity_name: { $eq: entity },
        action: { $eq: 'created' },
      },
    });

    return historic;
  }

  public async findByEntityName(
    user_id: string,
    entity_name: string,
  ): Promise<Historic[]> {
    const historic = await this.ormRepository.find({
      where: {
        user: { $eq: user_id },
        entity_name: { $eq: entity_name },
      },
      order: {
        created_at: 'DESC',
      },
    });

    return historic;
  }
}
