import { getRepository } from 'typeorm';

import { Category } from '../../../entities/Category';
import { ICreateCategoriesDTO } from '../../../useCases/_admin/CreateCategory/ICreateCategoriesDTO';
import { ICategoryRepository } from '../ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  private ormRepository = getRepository(Category);

  public async create(data: ICreateCategoriesDTO): Promise<Category> {
    const category = this.ormRepository.create(data);

    await this.ormRepository.save(category);

    return category;
  }

  public async findAll(): Promise<Category[]> {
    const category = await this.ormRepository.find();

    return category;
  }
}
