import { getRepository } from 'typeorm';

import { Habit } from '../../../entities/Habit';
import { ICreateHabitDTO } from '../../../useCases/CreateHabit/ICreateHabitDTO';
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
  ): Promise<Habit[] | undefined> {
    const habit = await this.ormRepository.find({
      where: {
        user_id,
        category_id,
      },
    });

    return habit;
  }
}
