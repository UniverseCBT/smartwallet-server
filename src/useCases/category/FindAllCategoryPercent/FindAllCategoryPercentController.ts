import { Request, Response } from 'express';

import { HabitsRepository } from '../../../repositories/habits/database/HabitsRepository';
import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';
import { WalletRepository } from '../../../repositories/wallet/database/WalletRepository';

import { FindAllCategoryPercentUseCase } from './FindAllCategoryPercentUseCase';

class FindAllCategoryPercentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { category_id } = request.params;

    const habitRepository = new HabitsRepository();
    const incomeRepository = new IncomeRepository();
    const walletRepository = new WalletRepository();

    const findAllCategoryPercent = new FindAllCategoryPercentUseCase(
      habitRepository,
      incomeRepository,
      walletRepository,
    );

    const findCategory = await findAllCategoryPercent.execute({
      user_id,
      category_id,
    });

    return response.status(200).json(findCategory);
  }
}

export default new FindAllCategoryPercentController();
