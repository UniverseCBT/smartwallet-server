import { Category } from '../../entities/Category';
import { ICategoryRepository } from '../../repositories/category/ICategoryRepository';

export class FindCategoryUseCase {
  execute(private categoriesRepository: ICategoryRepository) {}

  public async execute(id: string): Promise<Category> {}
}
