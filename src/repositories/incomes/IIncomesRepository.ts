import { Income } from '../../entities/Income';

export interface IIncomeRepository {
  create(user_id: string): Promise<Income>;
}
