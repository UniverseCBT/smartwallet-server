import { Request, Response } from 'express';
import * as yup from 'yup';

import { AppError } from '../../../share/AppError';
import { Bcrypt } from '../../../providers/Hash/implementations/Bcrypt';

import { UsersRepository } from '../../../repositories/users/database/UsersRepository';

import { CreateSessionUseCase } from './CreateSessionUseCase';

const schema = yup.object().shape({
  usernameOrEmail: yup.string().min(2).required('This field is required.'),
  password: yup.string().min(6).required(),
});

class CreateSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { usernameOrEmail, password } = request.body;

    const valid = schema.isValid({
      usernameOrEmail,
      password,
    });

    if (!valid) {
      throw new AppError('Validation Error');
    }

    const usersRepository = new UsersRepository();
    const bcrypt = new Bcrypt();

    const createSession = new CreateSessionUseCase(usersRepository, bcrypt);

    const session = await createSession.execute({
      usernameOrEmail,
      password,
    });

    return response.status(200).json(session);
  }
}

export default new CreateSessionController();
