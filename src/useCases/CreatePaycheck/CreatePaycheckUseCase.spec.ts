import { AppError } from '../../share/AppError';

import { FakePaycheckRepository } from '../../repositories/paycheck/database/fakes/FakePaycheckRepository';
import { CreatePaycheckUseCase } from './CreatePaycheckUseCase';

let fakePaycheckRepository: FakePaycheckRepository;

let createPaycheck: CreatePaycheckUseCase;

describe('CreatePaycheck', () => {
  beforeEach(() => {
    fakePaycheckRepository = new FakePaycheckRepository();
    createPaycheck = new CreatePaycheckUseCase(fakePaycheckRepository);
  });

  it('should not be able create a new paycheck without user exist', async () => {
    await expect(
      createPaycheck.execute({
        name: 'test paycheck',
        wallet: 300.5,
        user_id: 'user-nonexist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
