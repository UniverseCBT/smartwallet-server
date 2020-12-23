import { sign } from 'jsonwebtoken';

import { AppError } from '../../../share/AppError';

import { User } from '../../../entities/User';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';

import { IHash } from '../../../providers/Hash/repositories/IHash';
import { auth } from '../../../config/auth';
import { IWalletRepository } from '../../../repositories/wallet/IWalletRepository';

interface Response {
  user: User;
  token: string;
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,

    private incomesRepository: IIncomeRepository,

    private walletRepository: IWalletRepository,

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

    const usernameExist = await this.usersRepository.findByUsername(username);

    if (usernameExist) {
      throw new AppError('This username already exist');
    }

    const passwordHash = await this.hashProvider.hash(password);

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: passwordHash,
    });

    try {
      await this.incomesRepository.create(user.id);

      await this.walletRepository.create(user.id);
    } catch {
      throw new AppError('Your income went wrong', 500);
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
