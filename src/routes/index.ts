import { Router, Request, Response } from 'express';

import { authenticate } from './authenticate.routes';
import { userController } from './user.routes';

const routes = Router();

routes.use('/authenticate', authenticate);
routes.use('/user', userController);

export { routes };
