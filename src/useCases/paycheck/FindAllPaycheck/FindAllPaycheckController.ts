import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { PaycheckRepository } from '../../../repositories/paycheck/database/PaycheckRepository';
import { FindAllPaycheckUseCase } from './FindAllPaycheckUseCase';

class FindAllPaycheckController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const paycheckRepository = new PaycheckRepository();
    const paycheckUseCase = new FindAllPaycheckUseCase(paycheckRepository);

    const paycheck = await paycheckUseCase.execute(user_id);

    return response.status(200).json({ paycheck: classToClass(paycheck) });
  }
}

export default new FindAllPaycheckController();
