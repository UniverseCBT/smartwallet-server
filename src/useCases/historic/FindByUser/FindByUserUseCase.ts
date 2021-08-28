// import { AppError } from '../../../share/AppError';

import { IHistoricRepository } from '../../../repositories/historic/IHistoricRepository';
import { Historic } from '../../../schemas/Historic';

interface Request {
  user_id: string;
}

export class FindByUserUseCase {
  constructor(private historicRepository: IHistoricRepository) {}

  public async execute({ user_id }: Request): Promise<Historic[]> {
    const historic = await this.historicRepository.findAllByUser(user_id);

    return historic;
  }
}
