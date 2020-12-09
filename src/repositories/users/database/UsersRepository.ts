import { getRepository } from 'typeorm';

import { User } from '../../../entities/User';
import { CreateUserDTO } from '../../../useCases/CreateUser/CreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private ormRepository = getRepository(User);

  public async create({
    name,
    username,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      username,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findEmail = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return findEmail;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUsername = await this.ormRepository.findOne({
      where: {
        username,
      },
    });

    return findUsername;
  }

  public async findByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: [
        {
          username: usernameOrEmail,
        },
        {
          email: usernameOrEmail,
        },
      ],
    });

    return user;
  }

  public async findByUserId(user_id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        id: user_id,
      },
    });

    return findUser;
  }

  public async updateWallet(user: User): Promise<User> {
    const updateUser = await this.ormRepository.save(user);

    return updateUser;
  }
}
