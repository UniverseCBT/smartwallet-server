import { Router } from 'express';

import { FindByUserController } from '../useCases/historic/FindByUser/FindByUserController';
import { FindByMonthController } from '../useCases/historic/FindByMonth/FindByMonthController';

const routes = Router();

const findByUserController = new FindByUserController();
const findByMonthController = new FindByMonthController();

routes.get('/', findByUserController.index);
routes.get('/month', findByMonthController.index);

export default routes;
