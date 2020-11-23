import { AppError } from '../../share/AppError';

import { FakeUsersRepository } from '../../repositories/users/database/fakes/FakeUsersRepository';
import { CreateSessionUseCase } from './CreateSessionUseCase';
import { FakeHash } from '../../providers/Hash/fakes/FakeHash';

let fakeUsersRepository: FakeUsersRepository;
let fakeHash: FakeHash;

let createSession: CreateSessionUseCase;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHash = new FakeHash();

    createSession = new CreateSessionUseCase(fakeUsersRepository, fakeHash);
  });

  it('should be able create a new session', async () => {
    await fakeUsersRepository.create({
      name: 'test name',
      username: 'usernametest',
      email: 'email@test.com',
      password: 'passwordtest',
    });

    const session = await createSession.execute({
      usernameOrEmail: 'usernametest',
      password: 'passwordtest',
      automatically: '1d',
    });

    expect(session).toHaveProperty('token');
    expect(session).toHaveProperty('user');
  });

  it('should be able create a session with just email and password', async () => {
    await fakeUsersRepository.create({
      name: 'test name',
      username: 'usernametest',
      email: 'email@test.com',
      password: 'passwordtest',
    });

    const session = await createSession.execute({
      usernameOrEmail: 'email@test.com',
      password: 'passwordtest',
      automatically: '1d',
    });

    expect(session).toHaveProperty('token');
    expect(session).toHaveProperty('user');
  });

  it('should not be able create a new session with username or email invalid or non-existent', async () => {
    await fakeUsersRepository.create({
      name: 'test name',
      username: 'usernametest',
      email: 'email@test.com',
      password: 'passwordtest',
    });

    await expect(
      createSession.execute({
        usernameOrEmail: 'nonexist@email.com',
        password: 'passwordtest',
        automatically: '1d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able create a new session with password invalid or non-existent', async () => {
    await fakeUsersRepository.create({
      name: 'test name',
      username: 'usernametest',
      email: 'email@test.com',
      password: 'passwordtest',
    });

    await expect(
      createSession.execute({
        usernameOrEmail: 'email@test.com',
        password: 'non-exist',
        automatically: '1d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
