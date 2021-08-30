import { Request, Response } from 'express';

import { PaycheckRepository } from '../../../repositories/paycheck/database/PaycheckRepository';
import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';
import { HistoricRepository } from '../../../repositories/historic/database/HistoricRepository';

import { UpdatePaycheckUseCase } from './UpdatePaycheckUseCase';

class UpdatePaycheckController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, expected_received } = request.body;
    const { paycheck_id } = request.params;
    const { id: user_id } = request.user;

    const paycheckRepository = new PaycheckRepository();
    const incomeRepository = new IncomeRepository();
    const historicRepository = new HistoricRepository();

    const updatePaycheck = new UpdatePaycheckUseCase(
      paycheckRepository,
      incomeRepository,
      historicRepository,
    );

    const paycheck = await updatePaycheck.execute({
      paycheck_id,
      user_id,
      name,
      expected_received,
    });

    return response.status(200).json(paycheck);
  }
}

export default new UpdatePaycheckController();
