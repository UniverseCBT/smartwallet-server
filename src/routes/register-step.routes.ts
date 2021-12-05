import { Router } from 'express';

import CheckUserStepController from '../useCases/user/CheckUserStep/CheckUserStepController';

const routes = Router();

routes.get('/', CheckUserStepController.index);

export default routes;
