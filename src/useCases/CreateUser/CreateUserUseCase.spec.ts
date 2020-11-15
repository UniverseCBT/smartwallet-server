import { FakeUsersRepository } from '../../repositories/users/database/fakes/FakeUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let createUsersUseCase: CreateUserUseCase;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUsersUseCase = new CreateUserUseCase(fakeUsersRepository);
  });

  it('should be able create a new user with props validations', async () => {
    const userTest = await createUsersUseCase.execute({
      name: 'test',
      username: 'testUsername',
      email: 'test@test.com',
      password: 'test',
    });

    expect(userTest).toHaveProperty('id');
    expect(userTest).toHaveProperty('name');
    expect(userTest).toHaveProperty('username');
    expect(userTest).toHaveProperty('email');
    expect(userTest).toHaveProperty('password');
  });
});
