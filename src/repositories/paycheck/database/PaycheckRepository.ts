import { DeleteResult, getRepository } from 'typeorm';

import { IPaycheckRepository } from '../IPaycheckRepository';
import { Paycheck } from '../../../entities/Paycheck';
import { ICreatePaycheckDTO } from '../../../useCases/paycheck/CreatePaycheck/ICreatePaycheckDTO';

export class PaycheckRepository implements IPaycheckRepository {
  private ormRepository = getRepository(Paycheck);

  public async findAll(user_id: string): Promise<Paycheck[]> {
    const paycheck = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return paycheck;
  }

  public async create(data: ICreatePaycheckDTO): Promise<Paycheck> {
    const paycheck = this.ormRepository.create(data);

    await this.ormRepository.save(paycheck);

    return paycheck;
  }

  public async delete(paycheck_id: string): Promise<DeleteResult> {
    const paycheck = await this.ormRepository.delete(paycheck_id);

    return paycheck;
  }

  public async update(paycheck: Paycheck): Promise<Paycheck> {
    const updatePaycheck = await this.ormRepository.save(paycheck);

    return updatePaycheck;
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

  public async findPaycheckByUser(
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
