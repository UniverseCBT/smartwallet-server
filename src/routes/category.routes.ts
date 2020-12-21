import { Router } from 'express';

import FindCategoryController from '../useCases/category/FindCategory/FindCategoryController';

const routes = Router();

routes.get('/', FindCategoryController.index);

export default routes;
