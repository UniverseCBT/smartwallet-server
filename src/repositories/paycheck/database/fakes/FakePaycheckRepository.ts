import { v4 } from 'uuid';

import { Paycheck } from '../../../../entities/Paycheck';
import { ICreatePaycheckDTO } from '../../../../useCases/CreatePaycheck/ICreatePaycheckDTO';
import { IPaycheckRepository } from '../../IPaycheckRepository';

export class FakePaycheckRepository implements IPaycheckRepository {
  private paycheckRepository: Paycheck[] = [];

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

    this.paycheckRepository.push(paycheck);

    return paycheck;
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Paycheck | undefined> {
    const paycheck = await this.paycheckRepository.find(
      paycheckName =>
        paycheckName.name === name && paycheckName.user_id === user_id,
    );

    return paycheck;
  }

  public async delete(paycheck_id: string): Promise<void> {
    const paycheck = await this.paycheckRepository.findIndex(
      paycheckItem => paycheckItem.id === paycheck_id,
    );

    await this.paycheckRepository.splice(paycheck, 1);
  }
}
