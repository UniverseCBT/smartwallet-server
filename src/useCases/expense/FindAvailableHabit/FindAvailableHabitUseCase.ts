import { Habit } from '../../../entities/Habit';
import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';

interface Request {
  user_id: string;
  category_id: string;
}

export class FindAvailableHabitUseCase {
  constructor(private habitRepository: IHabitsRepository) {}

  public async execute({ user_id, category_id }: Request): Promise<Habit[]> {
    const habits = await this.habitRepository.findByCategoryAvailable(
      user_id,
      category_id,
    );

    return habits;
  }
}
