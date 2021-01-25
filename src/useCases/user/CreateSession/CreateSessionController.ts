import { Request, Response } from 'express';

import { UsersRepository } from '../../../repositories/users/database/UsersRepository';
import { Bcrypt } from '../../../providers/Hash/implementations/Bcrypt';

import { CreateSessionUseCase } from './CreateSessionUseCase';

class CreateSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { usernameOrEmail, password } = request.body;

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
