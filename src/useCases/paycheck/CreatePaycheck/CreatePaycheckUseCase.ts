import { Paycheck } from '../../../entities/Paycheck';
import { IPaycheckRepository } from '../../../repositories/paycheck/IPaycheckRepository';

import { AppError } from '../../../share/AppError';

interface Request {
  name: string;
  wallet: number;
  user_id: string;
}

export class CreatePaycheckUseCase {
  constructor(private paycheckRepository: IPaycheckRepository) {}

  public async execute({ name, wallet, user_id }: Request): Promise<Paycheck> {
    const nameExist = await this.paycheckRepository.findByName(name, user_id);

    if (nameExist && nameExist.user_id === user_id) {
      throw new AppError('Paycheck name already exist');
    }

    if (!user_id) {
      throw new AppError('Blank user');
    }

    if (wallet < 0.8) {
      throw new AppError('The minimum paycheck value is 1 dollar');
    }

    const paycheck = await this.paycheckRepository.create({
      name,
      wallet,
      user_id,
    });

    return paycheck;
  }
}
