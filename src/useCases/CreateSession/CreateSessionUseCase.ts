import { IHash } from '../../providers/Hash/repositories/IHash';
import { IUsersRepository } from '../../repositories/users/IUsersRepository';
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
  constructor(
    private users: IUsersRepository,

    private hash: IHash,
  ) {}

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
