import { v4 } from 'uuid';

import { Paycheck } from '../../../../entities/Paycheck';
import { ICreatePaycheckDTO } from '../../../../useCases/CreatePaycheck/ICreatePaycheckDTO';
import { IPaycheckRepository } from '../../IPaycheckRepository';

export class FakePaycheckRepository implements IPaycheckRepository {
  private paychecks: Paycheck[] = [];

  public async create({
    name,
    wallet,
    user_id,
  }: ICreatePaycheckDTO): Promise<Paycheck> {
    const paycheck = new Paycheck();

    Object.assign(paycheck, {
      id: v4(),
      name,
      wallet,
      user_id,
    });

    this.paychecks.push(paycheck);

    return paycheck;
  }

  public async findByUser(user: string): Promise<Paycheck | undefined> {
    const paycheck = this.paychecks.find(
      findPaycheck => findPaycheck.user_id === user,
    );

    return paycheck;
  }
}
