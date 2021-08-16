import { Request, Response } from 'express';

import { PaycheckRepository } from '../../../repositories/paycheck/database/PaycheckRepository';
import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';
import { HistoricRepository } from '../../../repositories/historic/database/HistoricRepository';

import { CreatePaycheckUseCase } from './CreatePaycheckUseCase';

class CreatePaycheckController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, expected_received, received_date } = request.body;
    const { id } = request.user;

    const paycheckRepository = new PaycheckRepository();
    const incomeRepository = new IncomeRepository();
    const historicRepository = new HistoricRepository();

    const createPaycheckUseCase = new CreatePaycheckUseCase(
      paycheckRepository,
      incomeRepository,
      historicRepository,
    );

    const paycheck = await createPaycheckUseCase.execute({
      name,
      expected_received,
      received_date,
      user_id: id,
    });

    return response.status(200).json(paycheck);
  }
}

export default new CreatePaycheckController();
