import { Request, Response } from 'express';

import { HabitsRepository } from '../../../repositories/habits/database/HabitsRepository';
import { FindAvailableHabitUseCase } from './FindAvailableHabitUseCase';

class FindAvailableHabitController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { category_id } = request.params;

    const habitRepository = new HabitsRepository();
    const findAvailableHabit = new FindAvailableHabitUseCase(habitRepository);

    const habits = await findAvailableHabit.execute({
      user_id: id,
      category_id,
    });

    return response.status(200).json(habits);
  }
}

export default new FindAvailableHabitController();
