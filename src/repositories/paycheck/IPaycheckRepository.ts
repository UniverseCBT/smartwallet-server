import { DeleteResult } from 'typeorm';

import { Paycheck } from '../../entities/Paycheck';
import { ICreatePaycheckDTO } from '../../useCases/CreatePaycheck/ICreatePaycheckDTO';

export interface IPaycheckRepository {
  create(data: ICreatePaycheckDTO): Promise<Paycheck>;
  delete(paycheck_id: string): Promise<DeleteResult>;
  findByName(name: string, user_id: string): Promise<Paycheck | undefined>;
  findWallet(
    paycheck_id: string,
    user_id: string,
  ): Promise<Paycheck | undefined>;
  findByPaycheckId(paycheck_id: string): Promise<Paycheck | undefined>;
}
