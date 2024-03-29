import { Historic } from '../../schemas/Historic';
import { HistoricDTO } from '../../useCases/historic/share/HistoricDTO';
import { ICheckUserStepDTO } from '../../useCases/user/CheckUserStep/CheckUserStepDTO';

export interface IHistoricRepository {
  create(historic: HistoricDTO): Promise<Historic>;
  findAllByUser(user_id: string): Promise<Historic[]>;
  findAllByUserDate(
    user_id: string,
    startMonth: Date,
    endMonth: Date,
  ): Promise<Historic[]>;
  findFirstByUserAction(
    request: ICheckUserStepDTO,
  ): Promise<Historic | undefined>;
  findByEntityName(entity: string, user_id: string): Promise<Historic[]>;
}
