import { Income } from '../../entities/Income';
import { IIncomeRepository } from '../../repositories/incomes/IIncomesRepository';

interface Request {
  user_id: string;
  profit_price: number;
}

export class CreateProfitUseCase {
  constructor(private incomeRepository: IIncomeRepository) {}

  public async execute({ user_id, profit_price }: Request): Promise<Income> {}
}
