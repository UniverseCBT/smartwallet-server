import { Paycheck } from '../../entities/Paycheck';
import { IPaycheckRepository } from '../../repositories/paycheck/IPaycheckRepository';

import { AppError } from '../../share/AppError';

interface Request {
  name: string;
  wallet: number;
  user_id: string;
}

interface Response {
  paycheck: Paycheck;
}

export class CreatePaycheckUseCase {
  constructor(private paycheckRepository: IPaycheckRepository) {}

  public async execute({ name, wallet, user_id }: Request): Promise<Response> {
    const paycheck = await this.paycheckRepository.create({
      name,
      wallet,
      user_id,
    });

    return {
      paycheck,
    };
  }
}
