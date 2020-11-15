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
    const user = new User({
      name,
      username,
      email,
      password,
    });

    this.usersRepository.push(user);

    return user;
  }
}
