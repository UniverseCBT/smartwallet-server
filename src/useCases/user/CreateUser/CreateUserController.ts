import { Request, Response } from 'express';

import { UsersRepository } from '../../../repositories/users/database/UsersRepository';
import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';
import { WalletRepository } from '../../../repositories/wallet/database/WalletRepository';
import { Bcrypt } from '../../../providers/Hash/implementations/Bcrypt';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password } = request.body;

    const userRepository = new UsersRepository();
    const incomesRepository = new IncomeRepository();
    const walletRepository = new WalletRepository();
    const hashProvider = new Bcrypt();

    const userUseCase = new CreateUserUseCase(
      userRepository,
      incomesRepository,
      walletRepository,
      hashProvider,
    );

    const user = await userUseCase.execute({
      name,
      username,
      email,
      password,
    });

    return response.status(200).json(user);
  }
}

export default new CreateUserController();
