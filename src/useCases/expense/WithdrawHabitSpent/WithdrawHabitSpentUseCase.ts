import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';

interface Request {
  category_id: string;
  total_value: number;
}

export class WithdrawHabitSpentUseCase {
  constructor(private habitRepository: IHabitsRepository) {}

  public async execute({ category_id }: Request): Promise<void> {}
}
