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

  public async findByUsername(username: string): Promise<User | undefined> {
    const findByUsername = this.usersRepository.find(
      userUsername => userUsername.username === username,
    );

    return findByUsername;
  }

  public async findByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<User | undefined> {
    const findByUsername = this.usersRepository.find(
      findUsername =>
        findUsername.username === usernameOrEmail ||
        findUsername.email === usernameOrEmail,
    );

    return findByUsername;
  }

  public async findByUserId(user_id: string): Promise<User | undefined> {
    const findUser = await this.usersRepository.find(
      user => user.id === user_id,
    );

    return findUser;
  }

  public async updateWallet(user: User): Promise<User> {
    const findUser = await this.usersRepository.findIndex(
      userIndex => userIndex.id === user.id,
    );

    this.usersRepository[findUser] = user;

    return user;
  }
}
