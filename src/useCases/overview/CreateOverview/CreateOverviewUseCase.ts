import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { IHistoricRepository } from '../../../repositories/historic/IHistoricRepository';

import { AppError } from '../../../share/AppError';

interface Response {
  action: string;
  entity_name: string;
  user: string;
}

export class CreateOverviewUseCase {
  constructor(
    private usersRepository: IUsersRepository,

    private historicRepository: IHistoricRepository,
  ) {}

  public async execute(user_id: string): Promise<Response> {
    if (!user_id) {
      throw new AppError('You can`t leave this field in blank.');
    }

    const userExist = await this.usersRepository.findByUserId(user_id);

    if (!userExist) {
      throw new AppError('This user does not exist');
    }

    const paycheckExist = await this.historicRepository.findByEntityName(
      user_id,
      'income',
    );

    if (paycheckExist.length === 0) {
      throw new AppError(
        "You can't continue. Create a new paycheck to continue",
      );
    }

    const habitExist = await this.historicRepository.findByEntityName(
      user_id,
      'habit',
    );

    if (habitExist.length === 0) {
      throw new AppError("You can't continue. Create a new habit to continue");
    }

    const overview = await this.historicRepository.create({
      action: 'created',
      user: user_id,
      entity_name: 'overview',
    });

    return overview;
  }
}
