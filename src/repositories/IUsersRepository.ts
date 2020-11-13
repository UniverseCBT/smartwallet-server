import { User } from '../entities/User';

export interface IUsersRepository {
  save(data: User): Promise<void>;
}
