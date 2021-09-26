import { Router } from 'express';

import CreateUserController from '../useCases/user/CreateUser/CreateUserController';
import CheckUserStepController from '../useCases/user/CheckUserStep/CheckUserStepController';

const routes = Router();

routes.post('', CreateUserController.create);
routes.get('/:entity', CheckUserStepController.index);

export default routes;
