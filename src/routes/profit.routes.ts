import { Router } from 'express';

import CreateProfitController from '../useCases/income/CreateProfit/CreateProfitController';

const routes = Router();

routes.post('', CreateProfitController.create);

export default routes;
