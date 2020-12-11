import { ICategoryRepository } from '../../repositories/category/ICategoryRepository';

import { Habit } from '../../entities/Habit';
import { IHabitsRepository } from '../../repositories/habits/IHabitsRepository';

import { AppError } from '../../share/AppError';

export class FindCategoryByHabitsUseCase {
  constructor(
    private categoriesRepository: ICategoryRepository,

    private habitsRepository: IHabitsRepository,
  ) {}

  public async execute(user_id: string, category_id: string): Promise<Habit[]> {
    const categoryExist = await this.categoriesRepository.findById(category_id);

    if (!categoryExist) {
      throw new AppError('Category does not exist');
    }

    const habit = await this.habitsRepository.findByCategory(
      user_id,
      category_id,
    );

    if (!habit?.length) {
      throw new AppError('Habits not found', 404);
    }

    return habit;
  }
}
