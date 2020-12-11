import { Category } from '../../entities/Category';
import { ICreateCategoriesDTO } from '../../useCases/_admin/CreateCategory/ICreateCategoriesDTO';

export interface ICategoryRepository {
  create(data: ICreateCategoriesDTO): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(category_id: string): Promise<Category | undefined>;
}
