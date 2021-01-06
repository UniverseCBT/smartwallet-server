import { Router } from 'express';

import FindCategoryController from '../useCases/category/FindCategory/FindCategoryController';
import FindAllCategoryPercentController from '../useCases/category/FindAllCategoryPercent/FindAllCategoryPercentController';

const routes = Router();

routes.get('/', FindCategoryController.index);
routes.get('/dashboard', FindAllCategoryPercentController.index);

export default routes;
