import { Request, Response } from 'express';
import * as yup from 'yup';

import { PaycheckRepository } from '../../../repositories/paycheck/database/PaycheckRepository';
import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';
import { HistoricRepository } from '../../../repositories/historic/database/HistoricRepository';

import { CreatePaycheckUseCase } from './CreatePaycheckUseCase';
import { AppError } from '../../../share/AppError';

const schema = yup.object().shape({
  name: yup.string().min(2).required('This field is required.'),
  expected_received: yup.number().required(),
  received_date: yup.string().required(),
});

class CreatePaycheckController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, expected_received, received_date } = request.body;
    const { id } = request.user;

    const valid = schema.isValid({
      name,
      expected_received,
      received_date,
    });

    if (!valid) {
      throw new AppError('Validation Error');
    }

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
