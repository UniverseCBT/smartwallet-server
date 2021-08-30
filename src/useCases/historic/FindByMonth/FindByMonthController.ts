import { Request, Response } from 'express';

import { FindByMonthUseCase } from './FindByMonthUseCase';
import { HistoricRepository } from '../../../repositories/historic/database/HistoricRepository';

export class FindByMonthController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { date } = request.body;

    const historicRepository = new HistoricRepository();
    const findByMonthUseCase = new FindByMonthUseCase(historicRepository);

    const historic = await findByMonthUseCase.execute({
      user_id: id,
      date,
    });

    return response.status(200).json(historic);
  }
}
