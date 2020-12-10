import { Request, Response } from 'express';

import { CategoryRepository } from '../../repositories/category/database/CategoryRepository';
import { FindCategoryUseCase } from './FindCategoryUseCase';

class FindCategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const categoryRepository = new CategoryRepository();
    const findAllCategory = new FindCategoryUseCase(categoryRepository);

    const category = await findAllCategory.execute();

    return response.status(200).json(category);
  }
}

export default new FindCategoryController();
