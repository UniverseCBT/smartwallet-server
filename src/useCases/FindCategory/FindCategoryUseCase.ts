import { Category } from '../../entities/Category';
import { ICategoryRepository } from '../../repositories/category/ICategoryRepository';

export class FindCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  public async execute(): Promise<Category[]> {
    const category = await this.categoriesRepository.findAll();

    return category;
  }
}
