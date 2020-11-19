import { UsersRepository } from '../../repositories/users/database/UsersRepository';
import { ICreateSessionDTO } from './ICreateSessionDTO';

interface UserData {
  user: {
    username?: string;
    email?: string;
    password: string;
  };
  token: string;
}

export class CreateSessionUseCase {
  constructor(private users: UsersRepository) {}

  public async execute({
    username,
    email,
    password,
  }: ICreateSessionDTO): Promise<UserData> {
    return {
      user: {
        username,
        email,
        password,
      },
      token: 'ikldsvjciljdfgcilfcgvj',
    };
  }
}
