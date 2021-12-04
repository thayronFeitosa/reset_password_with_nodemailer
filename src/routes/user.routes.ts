import { CreateUserControler } from '@modules/accounts/useCase/createUser/CreateUserControler';
import { ListUserController } from '@modules/accounts/useCase/listUser/ListUserController';
import { Router } from 'express';

const userController = Router();

const createUserControler = new CreateUserControler();
const listUserController = new ListUserController();

userController.post('/create', createUserControler.handle);
userController.get('/list', listUserController.handle);

export { userController };
