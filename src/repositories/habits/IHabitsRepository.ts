import { DeleteResult } from 'typeorm';

import { Habit } from '../../entities/Habit';

import { ICreateHabitDTO } from '../../useCases/habit/CreateHabit/ICreateHabitDTO';

export interface IHabitsRepository {
  create(data: ICreateHabitDTO): Promise<Habit>;
  findByCategory(user_id: string, category_id: string): Promise<Habit[]>;
  findByUser(user_id: string): Promise<Habit[] | undefined>;
  delete(habit_id: string): Promise<DeleteResult>;
  findByHabit(habit_id: string): Promise<Habit | undefined>;
  updateSpent(data: Habit): Promise<Habit>;
}
