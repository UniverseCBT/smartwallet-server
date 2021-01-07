import { Request, Response } from 'express';

import { CategoryRepository } from '../../../repositories/category/database/CategoryRepository';
import { HabitsRepository } from '../../../repositories/habits/database/HabitsRepository';
import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';

import { FindAllCategoryPercentUseCase } from './FindAllCategoryPercentUseCase';

class FindAllCategoryPercentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const categoryRepository = new CategoryRepository();
    const habitRepository = new HabitsRepository();
    const incomeRepository = new IncomeRepository();

    const findAllCategoryPercent = new FindAllCategoryPercentUseCase(
      categoryRepository,
      habitRepository,
      incomeRepository,
    );

    const findCategory = await findAllCategoryPercent.execute({ user_id });

    return response.status(200).json(findCategory);
  }
}

export default new FindAllCategoryPercentController();
