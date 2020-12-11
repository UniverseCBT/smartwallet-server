import { Router } from 'express';

import CreateHabitController from '../useCases/CreateHabit/CreateHabitController';
import FindCategoryByHabitsController from '../useCases/FindCategoryByHabits/FindCategoryByHabitsController';

const routes = Router();

routes.post('', CreateHabitController.create);
routes.get('/:category_id', FindCategoryByHabitsController.show);

export default routes;
