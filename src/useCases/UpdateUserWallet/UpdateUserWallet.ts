import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/users/IUsersRepository';

import { AppError } from '../../share/AppError';

interface Request {
  user_id: string;
  wallet: number;
}

export class UpdateUserWallet {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, wallet }: Request): Promise<User> {
    const user = await this.usersRepository.findByUserId(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const user_wallet = Number(user.wallet);

    const sum_paycheck = wallet + user_wallet;

    await this.usersRepository.updateWallet({
      ...user,
      wallet: sum_paycheck,
    });

    return user;
  }
}
