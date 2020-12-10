import { Request, Response } from 'express';

class FindCategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ ok: true });
  }
}

export default new FindCategoryController();
