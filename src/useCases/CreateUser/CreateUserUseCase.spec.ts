import { AppError } from '../../share/AppError';

import { FakeUsersRepository } from '../../repositories/users/database/fakes/FakeUsersRepository';
import { FakeHash } from '../../providers/Hash/fakes/FakeHash';
import { CreateUserUseCase } from './CreateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakeHash: FakeHash;

let createUsersUseCase: CreateUserUseCase;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHash = new FakeHash();

    createUsersUseCase = new CreateUserUseCase(fakeUsersRepository, fakeHash);
  });

  it('should be able create a new user', async () => {
    const userTest = await createUsersUseCase.execute({
      name: 'test',
      username: 'testUsername',
      email: 'test@test.com',
      password: 'test',
    });

    expect(userTest.user).toHaveProperty('id');
    expect(userTest.user).toHaveProperty('name');
    expect(userTest.user).toHaveProperty('username');
    expect(userTest.user).toHaveProperty('email');
    expect(userTest.user).toHaveProperty('password');
  });

  it('should not be able create a new user with the same email', async () => {
    await fakeUsersRepository.create({
      name: 'user1',
      username: 'userone',
      email: 'user@user.com',
      password: 'userone',
    });

    await expect(
      createUsersUseCase.execute({
        name: 'user2',
        username: 'usertwo',
        email: 'user@user.com',
        password: 'usertwo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
