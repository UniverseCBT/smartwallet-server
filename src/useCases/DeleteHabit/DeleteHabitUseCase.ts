import { IHabitsRepository } from '../../repositories/habits/IHabitsRepository';

import { AppError } from '../../share/AppError';

export class DeleteHabitUseCase {
  constructor(private habitsRepository: IHabitsRepository) {}

  public async execute(habit_id: string): Promise<void> {
    const habitExist = await this.habitsRepository.findByHabit(habit_id);

    if (!habitExist) {
      throw new AppError('Habit does not exist');
    }

    await this.habitsRepository.delete(habit_id);
  }
}
