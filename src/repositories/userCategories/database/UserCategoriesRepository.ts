import { getRepository } from 'typeorm';

import { IUserCategoriesRepository } from '../IUserCategoriesRepository';
import { UserCategories } from '../../../entities/UserCategories';
import { ICreateUserCategoriesDTO } from '../../../useCases/CreateUserCategory/ICreateUserCategoriesDTO';

export class UserCategoriesRepository implements IUserCategoriesRepository {
  private ormRepository = getRepository(UserCategories);

  public async create(data: ICreateUserCategoriesDTO): Promise<UserCategories> {
    const userCategory = this.ormRepository.create(data);

    await this.ormRepository.save(userCategory);

    return userCategory;
  }
}
