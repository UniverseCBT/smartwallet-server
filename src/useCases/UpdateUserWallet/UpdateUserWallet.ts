import { IPaycheckRepository } from '../../repositories/paycheck/IPaycheckRepository';
import { IUsersRepository } from '../../repositories/users/IUsersRepository';

interface Request {
  user: string;
}

export class UpdateUserWallet {
  constructor() {}

  public async execute({ user }: Request): Promise<string> {
    return user;
  }
}
