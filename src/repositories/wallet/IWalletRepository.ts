import { Wallet } from '../../entities/Wallet';

export interface IWalletRepository {
  create(user_id: string): Promise<Wallet>;
}
