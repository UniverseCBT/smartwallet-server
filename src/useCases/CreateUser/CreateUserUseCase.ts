import { AppError } from '../../share/AppError';

import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/users/IUsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

import { IHash } from '../../providers/Hash/repositories/IHash';

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
  }: CreateUserDTO): Promise<User> {
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

    return user;
  }
}
