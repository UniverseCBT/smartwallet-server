import { Request, Response } from 'express';

class CreateCategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { category, description, importance } = request.body;

    return response.status(200).json({ ok: true });
  }
}

export default new CreateCategoryController();
