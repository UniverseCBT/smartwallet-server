import { Request, Response } from 'express';

import { HabitsRepository } from '../../../repositories/habits/database/HabitsRepository';
import { WithdrawHabitAvailableUseCase } from './WithdrawHabitAvailableUseCase';

class WithdrawHabitAvailableController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      habit_placed,
      available_placed,
      habit_withdrawn,
      available_withdrawn,
    } = request.body;

    const habitRepository = new HabitsRepository();
    const withdrawHabitAvailable = new WithdrawHabitAvailableUseCase(
      habitRepository,
    );

    await withdrawHabitAvailable.execute({
      habit_placed,
      available_placed,
      habit_withdrawn,
      available_withdrawn,
    });

    return response.status(200).json({ ok: true });
  }
}

export default new WithdrawHabitAvailableController();
