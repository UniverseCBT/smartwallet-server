import { Request, Response } from 'express';
import { HabitsRepository } from '../../repositories/Habits/database/HabitsRepository';
import { CreateHabitUseCase } from './CreateHabitUseCase';

class CreateHabitController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { habit_name, importance, price, category_id } = request.body;
    const { id } = request.user;

    const habitsRepository = new HabitsRepository();
    const createHabits = new CreateHabitUseCase(habitsRepository);

    const habit = await createHabits.execute({
      habit_name,
      importance,
      price,
      category_id,
      user_id: id,
    });

    return response.status(200).json(habit);
  }
}

export default new CreateHabitController();
