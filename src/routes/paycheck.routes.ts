import { Router } from 'express';

import FindAllPaycheckController from '../useCases/paycheck/FindAllPaycheck/FindAllPaycheckController';
import CreatePaycheckController from '../useCases/paycheck/CreatePaycheck/CreatePaycheckController';
import DeletePaycheckController from '../useCases/paycheck/DeletePaycheck/DeletePaycheckController';
import UpdatePaycheckController from '../useCases/paycheck/UpdatePaycheck/UpdatePaycheckController';

const routes = Router();

routes.get('/', FindAllPaycheckController.index);
routes.post('/', CreatePaycheckController.create);
routes.delete('/:paycheck_id', DeletePaycheckController.delete);
routes.put('/:paycheck_id', UpdatePaycheckController.update);

export default routes;
