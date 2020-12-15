import { Router } from 'express';

import CreateHabitController from '../useCases/CreateHabit/CreateHabitController';
import FindCategoryByHabitsController from '../useCases/FindCategoryByHabits/FindCategoryByHabitsController';
import DeleteHabitController from '../useCases/DeleteHabit/DeleteHabitController';

const routes = Router();

routes.post('', CreateHabitController.create);
routes.get('/:category_id', FindCategoryByHabitsController.show);
routes.delete('/:habit_id', DeleteHabitController.delete);

export default routes;
