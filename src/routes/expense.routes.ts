import { Router } from 'express';

import CreateExpenseController from '../useCases/expense/CreateExpense/CreateExpenseController';
import FindAvailableHabitController from '../useCases/expense/FindAvailableHabit/FindAvailableHabitController';

const routes = Router();

routes.post('/', CreateExpenseController.create);
routes.get('/:category_id', FindAvailableHabitController.index);

export default routes;
