import { Request, Response } from 'express';

import { PaycheckRepository } from '../../../repositories/paycheck/database/PaycheckRepository';
import { CreatePaycheckUseCase } from './CreatePaycheckUseCase';
import { WalletRepository } from '../../../repositories/wallet/database/WalletRepository';

import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';

class CreatePaycheckController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      expected_received,
      current_received,
      received_date,
    } = request.body;
    const { id } = request.user;

    const paycheckRepository = new PaycheckRepository();
    const incomeRepository = new IncomeRepository();
    const walletRepository = new WalletRepository();

    const createPaycheckUseCase = new CreatePaycheckUseCase(
      paycheckRepository,
      incomeRepository,
      walletRepository,
    );

    const paycheck = await createPaycheckUseCase.execute({
      name,
      expected_received,
      current_received,
      received_date,
      user_id: id,
    });

    return response.status(200).json(paycheck);
  }
}

export default new CreatePaycheckController();
