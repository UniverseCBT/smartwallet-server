import { Paycheck } from '../../../entities/Paycheck';
import { IPaycheckRepository } from '../../../repositories/paycheck/IPaycheckRepository';

export class FindAllPaycheckUseCase {
  constructor(private paycheckRepository: IPaycheckRepository) {}

  public async execute(user_id: string): Promise<Paycheck[]> {
    const paycheck = await this.paycheckRepository.findAll(user_id);

    return paycheck;
  }
}
