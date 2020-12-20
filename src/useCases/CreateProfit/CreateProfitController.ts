import { Request, Response } from 'express';

class CreateProfitController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    return response.status(200).json({ ok: true });
  }
}

export default new CreateProfitController();
