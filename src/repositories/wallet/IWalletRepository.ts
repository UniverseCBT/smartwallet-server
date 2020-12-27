import { Wallet } from '../../entities/Wallet';

export interface IWalletRepository {
  create(user_id: string): Promise<Wallet>;
  findByUser(user_id: string): Promise<Wallet | undefined>;
  updateWallet(walletData: Wallet): Promise<Wallet>;
}
