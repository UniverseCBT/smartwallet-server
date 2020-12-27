import { getRepository } from 'typeorm';

import { IWalletRepository } from '../IWalletRepository';
import { Wallet } from '../../../entities/Wallet';

export class WalletRepository implements IWalletRepository {
  private ormRepository = getRepository(Wallet);

  public async create(user_id: string): Promise<Wallet> {
    const wallet = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(wallet);

    return wallet;
  }

  public async findByUser(user_id: string): Promise<Wallet | undefined> {
    const wallet = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });

    return wallet;
  }

  public async updateWallet(walletData: Wallet): Promise<Wallet> {
    const wallet = await this.ormRepository.save(walletData);

    return wallet;
  }
}
