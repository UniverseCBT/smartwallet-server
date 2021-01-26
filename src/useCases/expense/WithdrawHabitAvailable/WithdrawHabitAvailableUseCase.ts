import { AppError } from '../../../share/AppError';

import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';

interface Request {
  habit_placed: string;
  available_placed: number;
  habit_withdrawn: string;
  available_withdrawn: number;
}

export class WithdrawHabitAvailableUseCase {
  constructor(private habitRepository: IHabitsRepository) {}

  public async execute({
    habit_placed,
    available_placed,
    habit_withdrawn,
    available_withdrawn,
  }: Request): Promise<void> {
    if (available_withdrawn > available_placed) {
      throw new AppError(`You can't withdraw more then placed`);
    }

    const habitPlaced = await this.habitRepository.findByHabit(habit_placed);

    const habitWithdrawn = await this.habitRepository.findByHabit(
      habit_withdrawn,
    );

    if (!habitPlaced || !habitWithdrawn) {
      throw new AppError(`Habit does not exist`);
    }

    if (habit_placed === habit_withdrawn) {
      throw new AppError(`You can't placed the same habit`);
    }

    const habitPlacedValue =
      Number(habitPlaced.available) + available_withdrawn;

    const habitWithdrawnValue =
      Number(habitWithdrawn.available) - available_withdrawn;

    if (habitWithdrawnValue < 1) {
      throw new AppError(`Habit exceeded, remove of another habit`);
    }

    await this.habitRepository.updateSpent({
      ...habitPlaced,
      available: habitPlacedValue,
    });

    await this.habitRepository.updateSpent({
      ...habitWithdrawn,
      available: habitWithdrawnValue,
    });
  }
}
