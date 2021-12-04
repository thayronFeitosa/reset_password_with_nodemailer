import { AuthenticateController } from '@modules/accounts/useCase/authenticate/AuthenticateController';
import { Router } from 'express';

const authenticate = Router();

const authenticateController = new AuthenticateController();

authenticate.post('/', authenticateController.handle);

export { authenticate };
