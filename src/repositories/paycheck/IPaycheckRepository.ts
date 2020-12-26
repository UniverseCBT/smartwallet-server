import { DeleteResult } from 'typeorm';

import { Paycheck } from '../../entities/Paycheck';
import { ICreatePaycheckDTO } from '../../useCases/paycheck/CreatePaycheck/ICreatePaycheckDTO';

export interface IPaycheckRepository {
  create(data: ICreatePaycheckDTO): Promise<Paycheck>;
  delete(paycheck_id: string): Promise<DeleteResult>;
  update(paycheck: Paycheck): Promise<Paycheck>;
  findByName(name: string, user_id: string): Promise<Paycheck | undefined>;
  findPaycheckByUser(
    paycheck_id: string,
    user_id: string,
  ): Promise<Paycheck | undefined>;
  findByPaycheckId(paycheck_id: string): Promise<Paycheck | undefined>;
}
