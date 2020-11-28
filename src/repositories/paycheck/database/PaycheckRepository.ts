import { DeleteResult, getRepository } from 'typeorm';

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

  public async delete(paycheck_id: string): Promise<DeleteResult> {
    const paycheck = await this.ormRepository.delete(paycheck_id);

    return paycheck;
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Paycheck | undefined> {
    const paycheck = await this.ormRepository.findOne({
      where: {
        name,
        user_id,
      },
    });

    return paycheck;
  }

  public async findWallet(
    paycheck_id: string,
    user_id: string,
  ): Promise<Paycheck | undefined> {
    const paycheck = await this.ormRepository.findOne({
      where: {
        id: paycheck_id,
        user_id,
      },
    });

    return paycheck;
  }

  public async findByPaycheckId(
    paycheck_id: string,
  ): Promise<Paycheck | undefined> {
    const paycheck = await this.ormRepository.findOne({
      where: {
        id: paycheck_id,
      },
    });

    return paycheck;
  }
}
