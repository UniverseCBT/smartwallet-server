import { sign } from 'jsonwebtoken';

import { AppError } from '../../share/AppError';

import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/users/IUsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

import { IHash } from '../../providers/Hash/repositories/IHash';
import { auth } from '../../config/auth';

interface Response {
  user: User;
  token: string;
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,

    private hashProvider: IHash,
  ) {}

  public async execute({
    name,
    username,
    email,
    password,
  }: CreateUserDTO): Promise<Response> {
    const emailExist = await this.usersRepository.findByEmail(email);

    if (emailExist) {
      throw new AppError('This email already exist');
    }

    const passwordHash = await this.hashProvider.hash(password);

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: passwordHash,
    });

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
