import { Habit } from '../../entities/Habit';

import { ICreateHabitDTO } from '../../useCases/CreateHabit/ICreateHabitDTO';

export interface IHabitsRepository {
  create(data: ICreateHabitDTO): Promise<Habit>;
  // findByName(name: string, user_id: string): Promise<Habit | undefined>;
}
