import { Router } from 'express';

import { FindByUserController } from '../useCases/historic/FindByUser/FindByUserController';

const routes = Router();

const findByUserController = new FindByUserController();

routes.get('/', findByUserController.index);

export default routes;
