import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './session.routes';

import Authentication from '../middlewares/Authentication';

import paycheckRouter from './paycheck.routes';

const routes = Router();

routes.use('/sessions', sessionRouter);
routes.use('/users', usersRouter);

routes.use(Authentication);

routes.use('/paychecks', paycheckRouter);

export default routes;
