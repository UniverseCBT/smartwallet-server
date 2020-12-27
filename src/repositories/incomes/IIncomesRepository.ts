import { Income } from '../../entities/Income';

export interface IIncomeRepository {
  create(user_id: string): Promise<Income>;
  findByUser(user_id: string): Promise<Income | undefined>;
  updateExpectedMoney(incomeData: Income): Promise<Income>;
  updateCurrentMoney(incomeData: Income): Promise<Income>;
}
