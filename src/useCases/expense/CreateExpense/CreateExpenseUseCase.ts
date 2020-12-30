import { IExpenseRepository } from '../../../repositories/expense/IExpenseRepository';
import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';
import { IWalletRepository } from '../../../repositories/wallet/IWalletRepository';

import { AppError } from '../../../share/AppError';

interface Request {
  note: string;
  habit_id: string;
  current_spent: number;
  user_id: string;
}

export class CreateExpenseUseCase {
  constructor(
    private expenseRepository: IExpenseRepository,

    private habitRepository: IHabitsRepository,

    private walletRepository: IWalletRepository,
  ) {}

  public async execute({
    note,
    habit_id,
    current_spent,
    user_id,
  }: Request): Promise<void> {
    const wallet = await this.walletRepository.findByUser(user_id);

    if (!wallet) {
      throw new AppError('Please contact an admin, error in your wallet!', 500);
    }

    // Get all habits current money and sum
    // Wallet validation: spent is bigger then available wallet
  }
}
