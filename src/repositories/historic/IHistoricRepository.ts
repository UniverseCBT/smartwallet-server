import { Historic } from '../../schemas/Historic';
import { HistoricDTO } from '../../useCases/historic/share/HistoricDTO';

export interface IHistoricRepository {
  create(historic: HistoricDTO): Promise<Historic>;
  findAllByUser(user_id: string): Promise<Historic[]>;
  findAllByUserDate(user_id: string, date: string): Promise<Historic[]>;
}
