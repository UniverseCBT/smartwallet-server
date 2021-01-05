import { Profit } from '../../entities/Profit';
import { ICreateProfitDTO } from '../../useCases/income/CreateProfit/ICreateProfitDTO';

export interface IProfitRepository {
  create(data: ICreateProfitDTO): Promise<Profit>;
}
