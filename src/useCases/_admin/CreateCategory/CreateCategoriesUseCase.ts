import { Category } from '../../../entities/Category';
import { ICategoryRepository } from '../../../repositories/category/ICategoryRepository';

import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { AppError } from '../../../share/AppError';

interface Request {
  category: string;
  description: string;
  importance: number;
  user_id: string;
}

export class CreateCategoriesUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,

    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    category,
    description,
    importance,
    user_id,
  }: Request): Promise<Category> {
    const specificUser = await this.usersRepository.findByUserId(user_id);

    if (specificUser?.email !== 'universecbt@hotmail.com') {
      throw new AppError('Just Admin can create a new category', 401);
    }

    const categories = await this.categoryRepository.create({
      category,
      description,
      importance,
    });

    return categories;
  }
}
