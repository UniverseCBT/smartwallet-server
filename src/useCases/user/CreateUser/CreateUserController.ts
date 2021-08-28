import { Request, Response } from 'express';
import * as yup from 'yup';

import { AppError } from '../../../share/AppError';

import { UsersRepository } from '../../../repositories/users/database/UsersRepository';
import { IncomeRepository } from '../../../repositories/incomes/database/IncomeRepository';
import { WalletRepository } from '../../../repositories/wallet/database/WalletRepository';
import { Bcrypt } from '../../../providers/Hash/implementations/Bcrypt';

import { CreateUserUseCase } from './CreateUserUseCase';

const schema = yup.object().shape({
  name: yup.string().min(2).required('This field is required.'),
  username: yup.string().min(2).required('This field is required.'),
  email: yup.string().email().required('This field is required.'),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], `Passwords don't match`),
});

class CreateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, confirmPassword } = request.body;

    const valid = await schema.isValid({
      name,
      username,
      email,
      password,
      confirmPassword,
    });

    if (!valid) {
      throw new AppError('Validation Error');
    }

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
