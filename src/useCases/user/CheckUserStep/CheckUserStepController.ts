import { Request, Response } from 'express';

import { HistoricRepository } from '../../../repositories/historic/database/HistoricRepository';

import { CheckUserStepUseCase } from './CheckUserStepUseCase';

interface Parameters {
  page: 'income' | 'expense' | 'overview';
}

class CheckUserStepController {
  public async index(
    request: Request<Parameters>,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { page } = request.params;

    const historicRepository = new HistoricRepository();
    const checkUserStepUseCase = new CheckUserStepUseCase(historicRepository);

    const userAction = await checkUserStepUseCase.execute({
      user_id: id,
      page,
    });

    return response.status(200).json(userAction);
  }
}

export default new CheckUserStepController();
