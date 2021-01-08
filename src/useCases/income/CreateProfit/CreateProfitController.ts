import { Request, Response } from 'express';

import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';
import { WalletRepository } from '../../../repositories/wallet/database/WalletRepository';
import { PaycheckRepository } from '../../../repositories/paycheck/database/PaycheckRepository';
import { ProfitRepository } from '../../../repositories/profit/database/ProfitRepository';

import { CreateProfitUseCase } from './CreateProfitUseCase';

class CreateProfitController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { note, paycheck_id, habit_id, current_received } = request.body;

    const walletRepository = new WalletRepository();
    const incomeRepository = new IncomeRepository();
    const paycheckRepository = new PaycheckRepository();
    const profitRepository = new ProfitRepository();

    const profitUseCase = new CreateProfitUseCase(
      walletRepository,
      incomeRepository,
      paycheckRepository,
      profitRepository,
    );

    const profit = await profitUseCase.execute({
      user_id: id,
      habit_id,
      paycheck_id,
      note,
      current_received,
    });

    return response.status(200).json(profit);
  }
}

export default new CreateProfitController();
