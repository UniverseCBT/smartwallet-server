import { User } from '../../entities/User';
import { CreateUserDTO } from '../../useCases/CreateUser/CreateUserDTO';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined>;
}
