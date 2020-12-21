import { Habit } from '../../../entities/Habit';

import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

import { AppError } from '../../../share/AppError';

interface Request {
  habit_name: string;
  importance: number;
  price: number;
  category_id: string;
  user_id: string;
}

export class CreateHabitUseCase {
  constructor(
    private habitsRepository: IHabitsRepository,

    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    habit_name,
    importance,
    price,
    category_id,
    user_id,
  }: Request): Promise<Habit> {
    const findCategory = await this.habitsRepository.findByCategory(
      user_id,
      category_id,
    );

    if (!findCategory) {
      throw new AppError('User or Category does not exist');
    }

    const getUserWallet = await this.usersRepository.findByUserId(user_id);
    const userWallet = Number(getUserWallet?.wallet);

    const findHabits = await this.habitsRepository.findByUser(user_id);

    if (!findHabits) {
      throw new AppError('No habit found', 404);
    }

    const totalHabits = findHabits.reduce((acumulator, value) => {
      return acumulator + Number(value.price);
    }, 0);

    if (totalHabits + Number(price) > userWallet) {
      throw new AppError(
        'You overtake month budget, add a new paycheck to continue creating a new habits',
      );
    }

    const isBills = findCategory.find(bills => {
      return bills.category.category === 'Bills';
    });

    if (isBills) {
      const getBillsTotal = findCategory.reduce((acumulator, value) => {
        return acumulator + Number(value.price);
      }, 0);

      const percentBillsResult = Math.ceil((getBillsTotal * 100) / userWallet);
      const percentActualResult = Math.ceil((price * 100) / userWallet);

      if (percentBillsResult + percentActualResult > 98) {
        throw new AppError('Bills cannot overtake 98% of the total budget');
      }
    }

    const habit = await this.habitsRepository.create({
      habit_name,
      importance,
      price,
      category_id,
      user_id,
    });

    return habit;
  }
}
