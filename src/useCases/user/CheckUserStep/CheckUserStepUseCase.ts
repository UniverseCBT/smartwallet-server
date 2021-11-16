import { IHistoricRepository } from '../../../repositories/historic/IHistoricRepository';

interface Request {
  user_id: string;
}

interface Response {
  hasRegistered: boolean;
}

export class CheckUserStepUseCase {
  constructor(private historic: IHistoricRepository) {}

  public async execute({ user_id }: Request): Promise<Response> {
    const checkOverview = await this.historic.findFirstByUserAction({
      entity: 'overview',
      user_id,
    });

    const registeredStep: Response = {
      hasRegistered: !!checkOverview,
    };

    return registeredStep;
  }
}
