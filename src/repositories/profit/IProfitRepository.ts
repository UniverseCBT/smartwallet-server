import { Profit } from '../../entities/Profit';

export interface IProfitRepository {
  create(note: string, paycheck_id: string): Promise<Profit>;
}
