import { Router } from 'express';

import CreatePaycheckController from '../useCases/CreatePaycheck/CreatePaycheckController';

const routes = Router();

routes.post('/', CreatePaycheckController.create);

export default routes;
