import { Request, Response } from 'express';

import { CategoryRepository } from '../../../repositories/category/database/CategoryRepository';
import { CreateCategoriesUseCase } from './CreateCategoriesUseCase';

import { UsersRepository } from '../../../repositories/users/database/UsersRepository';

class CreateCategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { category, description, importance } = request.body;

    const categoryRepository = new CategoryRepository();
    const usersRepository = new UsersRepository();

    const createCategory = new CreateCategoriesUseCase(
      categoryRepository,
      usersRepository,
    );

    const categoryResult = await createCategory.execute({
      category,
      description,
      importance,
    });

    return response.status(200).json(categoryResult);
  }
}

export default new CreateCategoryController();
