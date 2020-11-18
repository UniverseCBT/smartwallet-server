import { Router } from 'express';

import CreateUserController from '../useCases/CreateUser/CreateUserController';

const routes = Router();

routes.post('', CreateUserController.create);

export default routes;
