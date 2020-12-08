import { Router } from 'express';

import CreateHabitController from '../useCases/CreateHabit/CreateHabitController';

const routes = Router();

routes.post('', CreateHabitController.create);

export default routes;
