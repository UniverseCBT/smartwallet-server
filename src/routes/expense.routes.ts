import { Router } from 'express';

import CreateExpenseController from '../useCases/expense/CreateExpense/CreateExpenseController';
import FindAvailableHabitController from '../useCases/expense/FindAvailableHabit/FindAvailableHabitController';
import WithdrawHabitAvailableController from '../useCases/expense/WithdrawHabitAvailable/WithdrawHabitAvailableController';

const routes = Router();

routes.post('/', CreateExpenseController.create);
routes.post('/withdraw', WithdrawHabitAvailableController.create);
routes.get('/:category_id', FindAvailableHabitController.index);

export default routes;
