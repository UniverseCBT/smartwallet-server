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

  it('should not be able create a new session with username and email', async () => {
    const userTest = await fakeUsersRepository.create({
      name: 'test name',
      username: 'usernametest',
      email: 'email@test.com',
      password: 'passwordtest',
    });

    const session = await createSession.execute({
      username: userTest.username,
      email: userTest.email,
      password: userTest.password,
    });

    expect(session).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able create a new session without a password', async () => {
    const userTest = await fakeUsersRepository.create({
      name: 'test name',
      username: 'usernametest',
      email: 'email@test.com',
      password: '',
    });

    const session = await createSession.execute({
      username: userTest.username,
      email: userTest.email,
      password: userTest.password,
    });

    expect(session).rejects.toBeInstanceOf(AppError);
  });
});
