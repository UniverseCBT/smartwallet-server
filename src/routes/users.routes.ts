import { Router } from 'express';

import Authentication from '../middlewares/Authentication';

import CreateUserController from '../useCases/user/CreateUser/CreateUserController';
import CheckUserStepController from '../useCases/user/CheckUserStep/CheckUserStepController';

const routes = Router();

routes.post('', CreateUserController.create);

routes.use(Authentication);

routes.get('/:entity', CheckUserStepController.index);

export default routes;
