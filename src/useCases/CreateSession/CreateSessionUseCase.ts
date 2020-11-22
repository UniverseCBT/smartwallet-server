import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/users/IUsersRepository';
import { IHash } from '../../providers/Hash/repositories/IHash';
import { AppError } from '../../share/AppError';

interface Request {
  usernameOrEmail: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export class CreateSessionUseCase {
  constructor(
    private users: IUsersRepository,

    private hash: IHash,
  ) {}

  public async execute({
    usernameOrEmail,
    password,
  }: Request): Promise<Response> {
    const userExist = await this.users.findByUsernameOrEmail(usernameOrEmail);

    if (!userExist) {
      throw new AppError('Username or email invalid');
    }

    const passwordCompare = await this.hash.compare(
      userExist.password,
      password,
    );

    if (!passwordCompare) {
      throw new AppError('Credentials invalids');
    }

    return {
      user: userExist,
      token: 'ikldsvjciljdfgcilfcgvj',
    };
  }
}
