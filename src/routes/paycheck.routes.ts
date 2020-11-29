import { Router } from 'express';

import CreatePaycheckController from '../useCases/CreatePaycheck/CreatePaycheckController';
import DeletePaycheckController from '../useCases/DeletePaycheck/DeletePaycheckController';
import UpdatePaycheckController from '../useCases/UpdatePaycheck/UpdatePaycheckController';

const routes = Router();

routes.post('/', CreatePaycheckController.create);
routes.delete('/:paycheck_id', DeletePaycheckController.delete);
routes.put('/:paycheck_id', UpdatePaycheckController.update);

export default routes;
