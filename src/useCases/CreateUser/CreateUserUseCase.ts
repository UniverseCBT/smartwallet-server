import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    username,
    email,
    password,
  }: CreateUserDTO): Promise<void> {
    return {
      name,
      username,
      email,
      password,
    };
  }
}
