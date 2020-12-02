import { UserCategories } from '../../entities/UserCategories';
import { ICreateUserCategoriesDTO } from '../../useCases/CreateUserCategory/ICreateUserCategoriesDTO';

export interface IUserCategoriesRepository {
  create(data: ICreateUserCategoriesDTO): Promise<UserCategories>;
}
