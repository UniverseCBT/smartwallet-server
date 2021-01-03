import { AppError } from '../../../share/AppError';

import { Wallet } from '../../../entities/Wallet';
import { Income } from '../../../entities/Income';
import { Paycheck } from '../../../entities/Paycheck';
import { Profit } from '../../../entities/Profit';

import { IWalletRepository } from '../../../repositories/wallet/IWalletRepository';
import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';
import { IPaycheckRepository } from '../../../repositories/paycheck/IPaycheckRepository';
import { IProfitRepository } from '../../../repositories/profit/IProfitRepository';

interface Request {
  user_id: string;
  paycheck_id: string;
  current_received: number;
  note: string;
}

interface Response {
  wallet: Wallet;
  income: Income;
  paycheck: Paycheck;
  profit: Profit;
}

export class CreateProfitUseCase {
  constructor(
    private walletRepository: IWalletRepository,

    private incomeRepository: IIncomeRepository,

    private paycheckRepository: IPaycheckRepository,

    private profitRepository: IProfitRepository,
  ) {}

  public async execute({
    user_id,
    paycheck_id,
    current_received,
    note,
  }: Request): Promise<Response> {
    const wallet = await this.walletRepository.findByUser(user_id);

    if (!wallet) {
      throw new AppError(
        `Please contact an admin to this error in your wallet`,
        500,
      );
    }

    const sumAvailableMoney = current_received + Number(wallet.available_money);

    const updateWallet = await this.walletRepository.updateWallet({
      ...wallet,
      available_money: sumAvailableMoney,
    });

    const income = await this.incomeRepository.findByUser(user_id);

    if (!income) {
      throw new AppError(
        `Please contact an admin to this error in your income`,
        500,
      );
    }

    const sumIncomeCurrentMoney =
      current_received + Number(income.current_money);

    const updateIncome = await this.incomeRepository.updateCurrentMoney({
      ...income,
      current_money: sumIncomeCurrentMoney,
    });

    const paycheck = await this.paycheckRepository.findByPaycheckId(
      paycheck_id,
    );

    if (!paycheck) {
      throw new AppError(
        `Don't find this paycheck in your account, please create another paycheck or contact an admin.`,
      );
    }

    const sumPaycheckCurrentReceived =
      current_received + Number(paycheck.current_received);

    const updatePaycheck = await this.paycheckRepository.update({
      ...paycheck,
      current_received: sumPaycheckCurrentReceived,
    });

    const profit = await this.profitRepository.create({
      note,
      value: current_received,
      paycheck_id,
    });

    return {
      wallet: updateWallet,
      income: updateIncome,
      paycheck: updatePaycheck,
      profit,
    };
  }
}
