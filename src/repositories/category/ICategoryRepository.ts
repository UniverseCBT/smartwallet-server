import { Category } from '../../entities/Category';

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
  findById(category_id: string): Promise<Category | undefined>;
}
