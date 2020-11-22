import { Router } from 'express';

import CreateSessionController from '../useCases/CreateSession/CreateSessionController';

const routes = Router();

routes.post('', CreateSessionController.create);

export default routes;
