import { UserCategories } from '../../entities/UserCategories';

import { IPaycheckRepository } from '../../repositories/paycheck/IPaycheckRepository';
import { IUserCategoriesRepository } from '../../repositories/userCategories/IUserCategoriesRepository';
import { IUsersRepository } from '../../repositories/users/IUsersRepository';

interface Request {
  user_id: string;
  paycheck_id: string;
}

export class CreateUserCategoryUseCase {
  constructor(
    private userCategoriesRepository: IUserCategoriesRepository,

    private usersRepository: IUsersRepository,

    private paycheckRepository: IPaycheckRepository,
  ) {}

  public async execute({
    user_id,
    paycheck_id,
  }: Request): Promise<UserCategories> {
    const userCategory = await this.userCategoriesRepository.create({
      user_id,
      paycheck_id,
    });

    return userCategory;
  }
}
