import { Request, Response } from 'express';

import { HabitsRepository } from '../../../repositories/habits/database/HabitsRepository';
import { UsersRepository } from '../../../repositories/users/database/UsersRepository';
import { CreateHabitUseCase } from './CreateHabitUseCase';

class CreateHabitController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      habit_name,
      importance,
      expected_spent,
      category_id,
    } = request.body;
    const { id } = request.user;

    const habitsRepository = new HabitsRepository();
    const usersRepository = new UsersRepository();

    const createHabits = new CreateHabitUseCase(
      habitsRepository,
      usersRepository,
    );

    const habit = await createHabits.execute({
      habit_name,
      importance,
      expected_spent,
      category_id,
      user_id: id,
    });

    return response.status(200).json(habit);
  }
}

export default new CreateHabitController();
