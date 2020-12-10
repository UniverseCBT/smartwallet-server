import { Router } from 'express';

import CreateCategoryController from '../useCases/_admin/CreateCategory/CreateCategoryController';
import FindCategoryController from '../useCases/FindCategory/FindCategoryController';

const routes = Router();

routes.post('/', CreateCategoryController.create);
routes.get('/', FindCategoryController.index);

export default routes;
