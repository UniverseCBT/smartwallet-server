import { Request, Response } from 'express';

import { HistoricRepository } from '../../../repositories/historic/database/HistoricRepository';

import { FindByUserUseCase } from './FindByUserUseCase';

export class FindByUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const historicRepository = new HistoricRepository();
    const findByUserUseCase = new FindByUserUseCase(historicRepository);

    const historic = await findByUserUseCase.execute({
      user_id: id,
    });

    return response.status(200).json(historic);
  }
}
