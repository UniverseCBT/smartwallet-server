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
}
