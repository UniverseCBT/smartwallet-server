import { Request, Response } from 'express';

import { PaycheckRepository } from '../../repositories/paycheck/database/PaycheckRepository';
import { UsersRepository } from '../../repositories/users/database/UsersRepository';

import { DeletePaycheckUseCase } from './DeletePaycheckUseCase';

class DeletePaycheckController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { paycheck_id } = request.params;

    const paycheckRepository = new PaycheckRepository();
    const usersRepository = new UsersRepository();

    const deletePaycheck = new DeletePaycheckUseCase(
      paycheckRepository,
      usersRepository,
    );

    await deletePaycheck.execute({
      paycheck_id,
      user_id: request.user.id,
    });

    return response.status(200).json({ message: 'Paycheck remove' });
  }
}

export default new DeletePaycheckController();
