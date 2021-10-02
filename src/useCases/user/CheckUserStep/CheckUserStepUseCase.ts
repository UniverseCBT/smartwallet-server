import { IHistoricRepository } from '../../../repositories/historic/IHistoricRepository';
import { RegisterPages } from './CheckUserStepDTO';

interface Request {
  user_id: string;
  page: RegisterPages;
}

interface StepProps {
  page: RegisterPages;
  registered: boolean;
}

interface Response {
  current: StepProps;
  previous: {
    page: string;
    registered: boolean;
  };
  next: {
    page: string;
    registered: boolean;
  };
  hasRegistered: boolean;
}

export class CheckUserStepUseCase {
  constructor(private historic: IHistoricRepository) {}

  public async execute({ user_id, page }: Request): Promise<Response> {
    const steps: StepProps[] = [
      {
        page: 'income',
        registered: false,
      },
      {
        page: 'expense',
        registered: false,
      },
      {
        page: 'overview',
        registered: false,
      },
    ];

    const stepIndex = steps.map(step => step.page).indexOf(page);
    const stepsLength = steps.length - 1;

    const prevPage = stepIndex - 1;
    const nextPage = stepIndex + 1;

    const historic = await this.historic.findFirstByUserAction({
      entity: page,
      user_id,
    });

    const getPreviousHistoric = await this.historic.findFirstByUserAction({
      entity: prevPage >= 0 ? steps[stepIndex - 1].page : steps[0].page,
      user_id,
    });

    const getNextHistoric = await this.historic.findFirstByUserAction({
      entity:
        nextPage <= stepsLength ? steps[stepIndex + 1].page : steps[0].page,
      user_id,
    });

    const checkOverview = await this.historic.findFirstByUserAction({
      entity: 'overview',
      user_id,
    });

    const registeredStep: Response = {
      current: {
        page,
        registered: !!historic,
      },
      previous: {
        page: prevPage >= 0 ? steps[stepIndex - 1].page : steps[0].page,
        registered: !!getPreviousHistoric,
      },
      next: {
        page: nextPage <= stepsLength ? steps[stepIndex + 1].page : '/',
        registered: !!getNextHistoric,
      },
      hasRegistered: !!checkOverview,
    };

    return registeredStep;
  }
}
