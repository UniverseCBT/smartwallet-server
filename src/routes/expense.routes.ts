import { Router } from 'express';

import CreateExpenseController from '../useCases/expense/CreateExpense/CreateExpenseController';

const routes = Router();

routes.post('/', CreateExpenseController.create);

export default routes;
