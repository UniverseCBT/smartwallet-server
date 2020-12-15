import { Request, Response } from 'express';

import { HabitsRepository } from '../../repositories/habits/database/HabitsRepository';
import { DeleteHabitUseCase } from './DeleteHabitUseCase';

class DeleteHabitController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { habit_id } = request.params;

    const habitsRepository = new HabitsRepository();

    const deleteHabit = new DeleteHabitUseCase(habitsRepository);

    await deleteHabit.execute(habit_id);

    return response.status(202).json({ message: 'Habit deleted' });
  }
}

export default new DeleteHabitController();
