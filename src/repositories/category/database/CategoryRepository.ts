import { getRepository } from 'typeorm';

import { Category } from '../../../entities/Category';
import { ICategoryRepository } from '../ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  private ormRepository = getRepository(Category);

  public async findAll(): Promise<Category[]> {
    const category = await this.ormRepository.find();

    return category;
  }

  public async findById(category_id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: {
        id: category_id,
      },
    });

    return category;
  }
}
