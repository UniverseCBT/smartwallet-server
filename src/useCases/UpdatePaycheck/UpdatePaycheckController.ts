import { Request, Response } from 'express';

import { PaycheckRepository } from '../../repositories/paycheck/database/PaycheckRepository';
import { UsersRepository } from '../../repositories/users/database/UsersRepository';

import { UpdatePaycheckUseCase } from './UpdatePaycheckUseCase';

class UpdatePaycheckController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, wallet } = request.body;
    const { paycheck_id } = request.params;
    const { id: user_id } = request.user;

    const paycheckRepository = new PaycheckRepository();
    const usersRepository = new UsersRepository();

    const updatePaycheck = new UpdatePaycheckUseCase(
      paycheckRepository,
      usersRepository,
    );

    const paycheck = await updatePaycheck.execute({
      paycheck_id,
      user_id,
      name,
      wallet,
    });

    return response.status(200).json(paycheck);
  }
}

export default new UpdatePaycheckController();
