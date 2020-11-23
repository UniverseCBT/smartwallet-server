import { Paycheck } from '../../entities/Paycheck';
import { ICreatePaycheckDTO } from '../../useCases/CreatePaycheck/ICreatePaycheckDTO';

export interface IPaycheckRepository {
  create(data: ICreatePaycheckDTO): Promise<Paycheck>;
  findByUser(user: string): Promise<Paycheck | undefined>;
}
