import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './session.routes';

import Authentication from '../middlewares/Authentication';
import Users from '../middlewares/Users';

import registerStepRouter from './register-step.routes';
import paycheckRouter from './paycheck.routes';
import categoryRouter from './category.routes';
import habitRouter from './habit.routes';
import profitRouter from './profit.routes';
import expenseRouter from './expense.routes';
import historicRouter from './historic.routes';

const routes = Router();

routes.use('/sessions', sessionRouter);
routes.use('/users', usersRouter);

// [] - Create Middleware to verify user exist in authentication middleware

routes.use(Authentication);
routes.use(Users);

routes.use('/sessions', registerStepRouter);
routes.use('/paychecks', paycheckRouter);
routes.use('/categories', categoryRouter);
routes.use('/habits', habitRouter);
routes.use('/profit', profitRouter);
routes.use('/expense', expenseRouter);
routes.use('/historic', historicRouter);

export default routes;
