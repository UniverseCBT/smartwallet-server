import { AppError } from '../../share/AppError';

import { FakePaycheckRepository } from '../../repositories/paycheck/database/fakes/FakePaycheckRepository';
import { FakeUsersRepository } from '../../repositories/users/database/fakes/FakeUsersRepository';
import { UpdateUserWalletUseCase } from './UpdateUserWalletUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakePaycheckRepository: FakePaycheckRepository;

let updateUserWallet: UpdateUserWalletUseCase;

describe('UpdateUserWallet', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePaycheckRepository = new FakePaycheckRepository();

    updateUserWallet = new UpdateUserWalletUseCase(fakeUsersRepository);
  });

  it('should not be able update a paycheck without valid user', async () => {
    await expect(
      updateUserWallet.execute({
        user_id: 'non-exist',
        wallet: 1000,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
