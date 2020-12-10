import { Habit } from '../../entities/Habit';

import { IHabitsRepository } from '../../repositories/habits/IHabitsRepository';
// import { AppError } from '../../share/AppError';

interface Request {
  habit_name: string;
  importance: number;
  price: number;
  category_id: string;
  user_id: string;
}

export class CreateHabitUseCase {
  constructor(private habitsRepository: IHabitsRepository) {}

  public async execute({
    habit_name,
    importance,
    price,
    category_id,
    user_id,
  }: Request): Promise<Habit> {
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
