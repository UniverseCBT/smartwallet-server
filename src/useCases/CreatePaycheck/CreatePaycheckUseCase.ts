import { AppError } from '../../share/AppError';

interface Request {}

interface Response {}

export class CreateSessionUseCase {
  constructor() {}

  public async execute({}: Request): Promise<Response> {}
}
