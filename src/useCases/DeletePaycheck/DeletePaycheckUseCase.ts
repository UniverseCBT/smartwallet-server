import { AppError } from '../../share/AppError';

import { IPaycheckRepository } from '../../repositories/paycheck/IPaycheckRepository';
import { IUsersRepository } from '../../repositories/users/IUsersRepository';

interface Request {
  paycheck_id: string;
  user_id: string;
}

export class DeletePaycheckUseCase {
  constructor(
    private paycheckRepository: IPaycheckRepository,

    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ paycheck_id, user_id }: Request): Promise<void> {
    const paycheckExist = await this.paycheckRepository.findByPaycheckId(
      paycheck_id,
    );

    if (!paycheckExist) {
      throw new AppError('Paycheck not found', 404);
    }

    const userPaycheckWallet = await this.paycheckRepository.findWallet(
      paycheck_id,
      user_id,
    );

    if (!userPaycheckWallet) {
      throw new AppError('User does not exist with this paycheck');
    }

    const user = await this.usersRepository.findByUserId(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const walletLess = user.wallet - userPaycheckWallet.wallet;

    await this.usersRepository.updateWallet({
      ...user,
      wallet: walletLess,
    });

    await this.paycheckRepository.delete(paycheck_id);
  }
}
