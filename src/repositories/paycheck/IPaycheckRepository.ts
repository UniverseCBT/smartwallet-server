import { Paycheck } from '../../entities/Paycheck';
import { ICreatePaycheckDTO } from '../../useCases/CreatePaycheck/ICreatePaycheckDTO';

export interface IPaycheckRepository {
  create(data: ICreatePaycheckDTO): Promise<Paycheck>;
  findByName(name: string): Promise<Paycheck | undefined>;
}
