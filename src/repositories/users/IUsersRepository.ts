import { User } from '../../entities/User';
import {
  ICreateSessionDTO,
  ResponseUserData,
} from '../../useCases/CreateSession/ICreateSessionDTO';
import { CreateUserDTO } from '../../useCases/CreateUser/CreateUserDTO';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findUser(data: ICreateSessionDTO): Promise<ResponseUserData>;
}
