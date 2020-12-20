import { Request, Response } from 'express';

import { PaycheckRepository } from '../../repositories/paycheck/database/PaycheckRepository';
import { IncomeRepository } from '../../repositories/incomes/database/IncomeRepository';

import { DeletePaycheckUseCase } from './DeletePaycheckUseCase';

class DeletePaycheckController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { paycheck_id } = request.params;

    const paycheckRepository = new PaycheckRepository();
    const incomeRepository = new IncomeRepository();

    const deletePaycheck = new DeletePaycheckUseCase(
      paycheckRepository,
      incomeRepository,
    );

    await deletePaycheck.execute({
      paycheck_id,
      user_id: request.user.id,
    });

    return response.status(200).json({ message: 'Paycheck remove' });
  }
}

export default new DeletePaycheckController();
