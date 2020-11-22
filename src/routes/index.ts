import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './session.routes';

const routes = Router();

routes.use('/sessions', sessionRouter);

routes.use('/users', usersRouter);

export default routes;
