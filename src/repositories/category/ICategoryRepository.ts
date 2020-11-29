import { Category } from '../../entities/Category';
import { ICreateCategoriesDTO } from '../../useCases/_admin/CreateCategory/ICreateCategoriesDTO';

export interface ICategoryRepository {
  create(data: ICreateCategoriesDTO): Promise<Category>;
}
