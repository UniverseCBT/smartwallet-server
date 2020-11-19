import { Request, Response } from 'express';

export class CreateSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;

    return response.status(200).json({
      username,
      email,
      password,
    });
  }
}
