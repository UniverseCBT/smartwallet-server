import { AppError } from '../../share/AppError';

import { FakePaycheckRepository } from '../../repositories/paycheck/database/fakes/FakePaycheckRepository';
import { CreatePaycheckUseCase } from './CreatePaycheckUseCase';
import { FakeUsersRepository } from '../../repositories/users/database/fakes/FakeUsersRepository';

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
    const user = await fakeUserRepository.create({
      name: 'paycheck user',
      username: 'paycheck',
      email: 'paycheck@user.com',
      password: 'paycheckuser',
    });

    const paycheck = await createPaycheck.execute({
      name: 'paycheck',
      wallet: 200,
      user_id: user.id,
    });

    expect(paycheck).toHaveProperty('id');
  });

  it('should not be able create name with the same name', async () => {
    await fakePaycheckRepository.create({
      name: 'paycheck',
      wallet: 2000,
      user_id: 'user',
    });

    await expect(
      createPaycheck.execute({
        name: 'paycheck',
        wallet: 2000,
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able ceate a new paycheck without user', async () => {
    await expect(
      createPaycheck.execute({
        name: 'paycheck',
        wallet: 2000,
        user_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able ceate a new paycheck without a min wallet value', async () => {
    await expect(
      createPaycheck.execute({
        name: 'paycheck',
        wallet: 0.7,
        user_id: 'htfhtffhtfhtf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
