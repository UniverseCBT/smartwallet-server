import { Expense } from '../../../entities/Expense';
import { Income } from '../../../entities/Income';
import { Paycheck } from '../../../entities/Paycheck';
import { Profit } from '../../../entities/Profit';
import { Wallet } from '../../../entities/Wallet';

export interface HistoricDTO {
  action: string;
  entity_name: string;
  user: string;
  entity: Expense | Income | Paycheck | Profit | Wallet;
}
