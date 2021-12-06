import { Request, Response } from 'express';

import { UsersRepository } from '../../../repositories/users/database/UsersRepository';
import { HistoricRepository } from '../../../repositories/historic/database/HistoricRepository';

import { CreateOverviewUseCase } from './CreateOverviewUseCase';

class CreateOverviewController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const historicRepository = new HistoricRepository();
    const usersRepository = new UsersRepository();

    const overviewUseCase = new CreateOverviewUseCase(
      usersRepository,
      historicRepository,
    );

    const overview = await overviewUseCase.execute(id);

    return response.status(200).json(overview);
  }
}

export default new CreateOverviewController();
