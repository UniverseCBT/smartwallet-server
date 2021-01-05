import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './session.routes';

import Authentication from '../middlewares/Authentication';

import paycheckRouter from './paycheck.routes';
import categoryRouter from './category.routes';
import habitRouter from './habit.routes';
import profitRouter from './profit.routes';
import expenseRouter from './expense.routes';

const routes = Router();

routes.use('/sessions', sessionRouter);
routes.use('/users', usersRouter);

routes.use(Authentication);

routes.use('/paychecks', paycheckRouter);
routes.use('/categories', categoryRouter);
routes.use('/habits', habitRouter);
routes.use('/profit', profitRouter);
routes.use('/expense', expenseRouter);

export default routes;
