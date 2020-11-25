import { getRepository } from 'typeorm';

import { IPaycheckRepository } from '../IPaycheckRepository';
import { Paycheck } from '../../../entities/Paycheck';
import { ICreatePaycheckDTO } from '../../../useCases/CreatePaycheck/ICreatePaycheckDTO';

export class PaycheckRepository implements IPaycheckRepository {
  private ormRepository = getRepository(Paycheck);

  public async create({
    name,
    wallet,
    user_id,
  }: ICreatePaycheckDTO): Promise<Paycheck> {
    const paycheck = this.ormRepository.create({ name, wallet, user_id });

    await this.ormRepository.save(paycheck);

    return paycheck;
  }
}
