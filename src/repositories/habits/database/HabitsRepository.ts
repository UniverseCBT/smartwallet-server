import { DeleteResult, getRepository, MoreThan } from 'typeorm';

import { Habit } from '../../../entities/Habit';
import { ICreateHabitDTO } from '../../../useCases/habit/CreateHabit/ICreateHabitDTO';
import { IHabitsRepository } from '../IHabitsRepository';

export class HabitsRepository implements IHabitsRepository {
  private ormRepository = getRepository(Habit);

  public async create(data: ICreateHabitDTO): Promise<Habit> {
    const habit = this.ormRepository.create(data);

    await this.ormRepository.save(habit);

    return habit;
  }

  public async findByCategory(
    user_id: string,
    category_id: string,
  ): Promise<Habit[]> {
    const habit = await this.ormRepository.find({
      where: {
        user_id,
        category_id,
      },
    });

    return habit;
  }

  public async findByUser(user_id: string): Promise<Habit[] | undefined> {
    const habit = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return habit;
  }

  public async delete(habit_id: string): Promise<DeleteResult> {
    const habit = await this.ormRepository.delete(habit_id);

    return habit;
  }

  public async findByHabit(habit_id: string): Promise<Habit | undefined> {
    const habit = await this.ormRepository.findOne({
      where: {
        id: habit_id,
      },
    });

    return habit;
  }

  public async updateSpent(data: Habit): Promise<Habit> {
    const habit = await this.ormRepository.save(data);

    return habit;
  }

  public async findByCategoryAvailable(
    user_id: string,
    category_id: string,
  ): Promise<Habit[]> {
    const habits = await this.ormRepository.find({
      where: {
        user_id,
        category_id,
        available: MoreThan(0),
      },
    });

    return habits;
  }
}
