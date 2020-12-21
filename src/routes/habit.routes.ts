import { Router } from 'express';

import CreateHabitController from '../useCases/habit/CreateHabit/CreateHabitController';
import FindCategoryByHabitsController from '../useCases/habit/FindCategoryByHabits/FindCategoryByHabitsController';
import DeleteHabitController from '../useCases/habit/DeleteHabit/DeleteHabitController';

const routes = Router();

routes.post('', CreateHabitController.create);
routes.get('/:category_id', FindCategoryByHabitsController.show);
routes.delete('/:habit_id', DeleteHabitController.delete);

export default routes;
