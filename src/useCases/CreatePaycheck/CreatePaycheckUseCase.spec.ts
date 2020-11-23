import { AppError } from '../../share/AppError';

import { FakePaycheckRepository } from '../../repositories/paycheck/database/fakes/FakePaycheckRepository';
import { FakeUsersRepository } from '../../repositories/users/database/fakes/FakeUsersRepository';
import { CreatePaycheckUseCase } from './CreatePaycheckUseCase';

let fakePaycheckRepository: FakePaycheckRepository;
let fakeUserRepository: FakeUsersRepository;

let createPaycheck: CreatePaycheckUseCase;

describe('CreatePaycheck', () => {
  beforeEach(() => {
    fakePaycheckRepository = new FakePaycheckRepository();
    fakeUserRepository = new FakeUsersRepository();

    createPaycheck = new CreatePaycheckUseCase(fakePaycheckRepository);
  });

  it('should be able create a new paycheck', async () => {
    const fakeUser = await fakeUserRepository.create({
      name: 'paycheck user',
      username: 'paycheckUser',
      email: 'fake@paycheck.com',
      password: 'fakeuser',
    });

    const { paycheck } = await createPaycheck.execute({
      name: 'test paycheck',
      wallet: 300.5,
      user_id: fakeUser.id,
    });

    expect(paycheck).toHaveProperty('id');
  });
});
