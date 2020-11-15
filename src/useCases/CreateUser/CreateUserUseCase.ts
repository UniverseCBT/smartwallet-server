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
    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password,
    });

    return user;
  }
}
