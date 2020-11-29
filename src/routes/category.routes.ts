import { Router } from 'express';

import CreateCategoryController from '../useCases/_admin/CreateCategory/CreateCategoryController';

const routes = Router();

routes.post('/', CreateCategoryController.create);

export default routes;
