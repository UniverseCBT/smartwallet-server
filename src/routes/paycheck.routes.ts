import { Router } from 'express';

import CreatePaycheckController from '../useCases/CreatePaycheck/CreatePaycheckController';
import DeletePaycheckController from '../useCases/DeletePaycheck/DeletePaycheckController';

const routes = Router();

routes.post('/', CreatePaycheckController.create);
routes.delete('/:paycheck_id', DeletePaycheckController.delete);

export default routes;
