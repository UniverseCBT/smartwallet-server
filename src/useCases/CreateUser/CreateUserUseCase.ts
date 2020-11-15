import { AppError } from '../../share/AppError';

import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/users/IUsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

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

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password,
    });

    return user;
  }
}
