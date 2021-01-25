import { sign } from 'jsonwebtoken';

import { User } from '../../../entities/User';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { IHash } from '../../../providers/Hash/repositories/IHash';

import { AppError } from '../../../share/AppError';
import { auth } from '../../../config/auth';

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
    const user = await this.users.findByUsernameOrEmail(usernameOrEmail);

    if (!user) {
      throw new AppError('Username or email invalid');
    }

    const passwordCompare = await this.hash.compare(password, user.password);

    if (!passwordCompare) {
      throw new AppError('Credentials invalids');
    }

    const token = sign({}, auth.secret, {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}
