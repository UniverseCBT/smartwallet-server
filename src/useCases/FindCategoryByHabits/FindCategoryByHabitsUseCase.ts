import { Category } from '../../entities/Category';
import { ICategoryRepository } from '../../repositories/category/ICategoryRepository';
import { IHabitsRepository } from '../../repositories/habits/IHabitsRepository';

export class FindCategoryByHabitsUseCase {
  constructor(
    private categoriesRepository: ICategoryRepository,

    private habitsRepository: IHabitsRepository,
  ) {}

  public async execute(): Promise<Category> {}
}
