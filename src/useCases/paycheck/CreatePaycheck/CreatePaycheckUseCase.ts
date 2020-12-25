import { Paycheck } from '../../../entities/Paycheck';
import { IPaycheckRepository } from '../../../repositories/paycheck/IPaycheckRepository';

import { AppError } from '../../../share/AppError';

interface Request {
  name: string;
  expected_received: number;
  received_date: 'weekly' | 'monthly';
  user_id: string;
}

export class CreatePaycheckUseCase {
  constructor(private paycheckRepository: IPaycheckRepository) {}

  public async execute({
    name,
    expected_received,
    received_date,
    user_id,
  }: Request): Promise<Paycheck> {
    const nameExist = await this.paycheckRepository.findByName(name, user_id);

    if (nameExist && nameExist.user_id === user_id) {
      throw new AppError(`Paycheck ${name}, already in use. try another!`);
    }

    if (!user_id) {
      throw new AppError('This user does not exist');
    }

    if (expected_received < 0.8) {
      throw new AppError('The minimum paycheck value is 1 dollar');
    }

    if (!(received_date === 'weekly' || received_date === 'monthly')) {
      throw new AppError(
        `You can't create received date with ${received_date}`,
        403,
      );
    }

    const paycheck = await this.paycheckRepository.create({
      name,
      expected_received,
      received_date,
      user_id,
    });

    return paycheck;
  }
}
