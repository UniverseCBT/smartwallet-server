import { v4 } from 'uuid';

import { User } from '../../../../entities/User';
import { CreateUserDTO } from '../../../../useCases/CreateUser/CreateUserDTO';
import { IUsersRepository } from '../../IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async create({
    name,
    username,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      name,
      username,
      email,
      password,
      wallet: 0,
    });

    this.usersRepository.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findByEmail = this.usersRepository.find(
      userEmail => userEmail.email === email,
    );

    return findByEmail;
  }
}
