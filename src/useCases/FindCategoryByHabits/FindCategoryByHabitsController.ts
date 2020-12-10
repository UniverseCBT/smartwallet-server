import { Request, Response } from 'express';

class FindCategoryByHabits {
  public async show(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ ok: true });
  }
}

export default new FindCategoryByHabits();
