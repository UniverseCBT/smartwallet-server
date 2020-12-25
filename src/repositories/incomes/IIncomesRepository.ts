import { Income } from '../../entities/Income';

export interface IIncomeRepository {
  create(user_id: string, note?: string): Promise<Income>;
  findByUser(user_id: string): Promise<Income | undefined>;
  updateExpectedWallet(user_id: Income): Promise<Income>;
}
