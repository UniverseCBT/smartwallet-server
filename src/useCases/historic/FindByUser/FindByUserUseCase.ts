import { AppError } from '../../../share/AppError';

import { HistoricRepository } from '../../../repositories/historic/database/HistoricRepository';
import { Historic } from '../../../schemas/Historic';

interface Request {
  user_id: string;
}

export class FindByUserUseCase {
  constructor(private historicRepository: HistoricRepository) {}

  public async execute({ user_id }: Request): Promise<Historic[] | undefined> {
    const historic = await this.historicRepository.findAllByUser(user_id);

    if (!historic) {
      throw new AppError('Something went wrong', 'historic', 500);
    }

    return historic;
  }
}
