import { Request, Response } from 'express';

import { CategoryRepository } from '../../repositories/category/database/CategoryRepository';
import { HabitsRepository } from '../../repositories/habits/database/HabitsRepository';

import { FindCategoryByHabitsUseCase } from './FindCategoryByHabitsUseCase';

class FindCategoryByHabits {
  public async show(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const { id } = request.user;

    const categoryRepository = new CategoryRepository();
    const habitsRepository = new HabitsRepository();

    const findCategoryByHabits = new FindCategoryByHabitsUseCase(
      categoryRepository,
      habitsRepository,
    );

    const habits = await findCategoryByHabits.execute(id, category_id);

    return response.status(200).json(habits);
  }
}

export default new FindCategoryByHabits();
