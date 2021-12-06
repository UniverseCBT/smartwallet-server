import { Router } from 'express';

import CreateOverviewController from '../useCases/overview/CreateOverview/CreateOverviewController';

const routes = Router();

routes.post('', CreateOverviewController.create);

export default routes;
