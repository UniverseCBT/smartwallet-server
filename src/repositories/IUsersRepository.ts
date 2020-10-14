import { User } from '../entities/User';

export interface IUsersRepository {
  create(): Promise<User>;
}
