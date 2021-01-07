import { ICategoryRepository } from '../../../repositories/category/ICategoryRepository';
import { IHabitsRepository } from '../../../repositories/habits/IHabitsRepository';
import { IIncomeRepository } from '../../../repositories/incomes/IIncomesRepository';

import { AppError } from '../../../share/AppError';

import { transformPercent } from '../../../util/transformPercent';

interface Request {
  user_id: string;
}

interface Response {
  percent: number;
  name: string;
}

export class FindAllCategoryPercentUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,

    private habitRepository: IHabitsRepository,

    private incomeRepository: IIncomeRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<Response[]> {
    const category = await this.categoryRepository.findAll();

    const income = await this.incomeRepository.findByUser(user_id);

    if (!income) {
      throw new AppError(
        'Sorry there was an error loading your income, contact an admin.',
        500,
      );
    }

    const availableMoneyMonth = Number(income.current_money);

    const teste = category.map(async categoryItem => {
      const habit = await this.habitRepository.findByCategory(
        user_id,
        categoryItem.id,
      );

      const getTotalSpent = habit.reduce(
        (acumulator, value) => {
          const getCategoryPercent = transformPercent(
            Number(value.current_spent),
            availableMoneyMonth,
          );

          const returnData = Object.assign(acumulator, {
            percent: getCategoryPercent,
            name: categoryItem.category,
          });

          return returnData;
        },
        {
          percent: 0,
          name: '',
        },
      );

      return getTotalSpent;
    });

    console.log(teste);
  }
}
