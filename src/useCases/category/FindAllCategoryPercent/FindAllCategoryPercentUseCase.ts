import { ICategoryRepository } from '../../../repositories/category/ICategoryRepository';
import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';
import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';

import { AppError } from '../../../share/AppError';

import { transformPercent } from '../../../util/transformPercent';

interface Request {
  user_id: string;
}

interface Response {
  category: {
    percent: string;
    name: string;
    category_money: number;
    money_added: number;
  };
}

export class FindAllCategoryPercentUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,

    private habitRepository: IHabitsRepository,

    private incomeRepository: IIncomeRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<Response> {
    const category = await this.categoryRepository.findAll();

    const income = await this.incomeRepository.findByUser(user_id);

    if (!income) {
      throw new AppError(
        'Sorry there was an error loading your income, contact an admin.',
        500,
      );
    }

    const availableMoneyMonth = Number(income.current_money);

    category.forEach(async categoryItem => {
      const habit = await this.habitRepository.findByCategory(
        user_id,
        categoryItem.id,
      );

      if (!habit) return;

      const getTotalSpent = habit.reduce((acumulator, value) => {
        return acumulator + Number(value.current_spent);
      }, 0);

      const getPercent = transformPercent(getTotalSpent, availableMoneyMonth);

      console.log(getPercent);
    });

    // console.log(findCategoryByHabit);
  }
}
