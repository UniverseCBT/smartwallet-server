import { Request, Response } from 'express';

import { PaycheckRepository } from '../../repositories/paycheck/database/PaycheckRepository';
import { CreatePaycheckUseCase } from './CreatePaycheckUseCase';

import { UpdateUserWallet } from '../UpdateUserWallet/UpdateUserWallet';

class CreatePaycheckController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, wallet } = request.body;
    const { id } = request.user;

    const paycheckRepository = new PaycheckRepository();
    const createPaycheckUseCase = new CreatePaycheckUseCase(paycheckRepository);

    const updateUserWalletUseCase = new UpdateUserWallet();

    const paycheck = await createPaycheckUseCase.execute({
      name,
      wallet,
      user_id: id,
    });

    const walletUpdate = await updateUserWalletUseCase.execute({
      user: id,
    });

    return response.status(200).json({ paycheck, walletUpdate });
  }
}

export default new CreatePaycheckController();
