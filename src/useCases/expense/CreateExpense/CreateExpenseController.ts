import { Request, Response } from 'express';

class CreateExpenseController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ ok: true });
  }
}

export default new CreateExpenseController();
