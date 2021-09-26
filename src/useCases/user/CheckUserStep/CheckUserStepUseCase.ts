import { IHistoricRepository } from '../../../repositories/historic/IHistoricRepository';
import { RegisterPages } from './CheckUserStepDTO';

interface Request {
  user_id: string;
  page: RegisterPages;
}

interface Response {
  page: RegisterPages;
  registered: boolean;
}

export class CheckUserStepUseCase {
  constructor(private historic: IHistoricRepository) {}

  public async execute({ user_id, page }: Request): Promise<Response> {
    const historic = await this.historic.findFirstByUserAction({
      entity: page,
      user_id,
    });

    if (!historic) {
      return {
        page,
        registered: false,
      };
    }

    return {
      page,
      registered: true,
    };
  }
}
