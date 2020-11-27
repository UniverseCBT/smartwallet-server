import { Request, Response } from 'express';

import { PaycheckRepository } from '../../repositories/paycheck/database/PaycheckRepository';
import { CreatePaycheckUseCase } from './CreatePaycheckUseCase';

import { UpdateUserWalletUseCase } from '../UpdateUserWallet/UpdateUserWalletUseCase';
import { UsersRepository } from '../../repositories/users/database/UsersRepository';

class CreatePaycheckController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, wallet } = request.body;
    const { id } = request.user;

    const paycheckRepository = new PaycheckRepository();
    const createPaycheckUseCase = new CreatePaycheckUseCase(paycheckRepository);

    const paycheck = await createPaycheckUseCase.execute({
      name,
      wallet,
      user_id: id,
    });

    const usersRepository = new UsersRepository();
    const updateUserWallet = new UpdateUserWalletUseCase(usersRepository);

    await updateUserWallet.execute({
      user_id: id,
      wallet,
    });

    return response.status(200).json(paycheck);
  }
}

export default new CreatePaycheckController();
