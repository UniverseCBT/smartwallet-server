import { Habit } from '../../entities/Habit';

import { ICreateHabitDTO } from '../../useCases/CreateHabit/ICreateHabitDTO';

export interface IHabitsRepository {
  create(data: ICreateHabitDTO): Promise<Habit>;
  findByCategory(
    user_id: string,
    category_id: string,
  ): Promise<Habit[] | undefined>;
}
