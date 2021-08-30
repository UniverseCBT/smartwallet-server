import { startOfMonth, endOfMonth, parseISO } from 'date-fns';

import { IHistoricRepository } from '../../../repositories/historic/IHistoricRepository';
import { Historic } from '../../../schemas/Historic';

export interface Request {
  user_id: string;
  date: string;
}

export class FindByMonthUseCase {
  constructor(private historicRepository: IHistoricRepository) {}

  public async execute({ user_id, date }: Request): Promise<Historic[]> {
    const parsedDate = date ? parseISO(date) : new Date();

    const startMonth = startOfMonth(parsedDate);
    const endMonth = endOfMonth(parsedDate);

    const historic = await this.historicRepository.findAllByUserDate(
      user_id,
      startMonth,
      endMonth,
    );

    return historic;
  }
}
