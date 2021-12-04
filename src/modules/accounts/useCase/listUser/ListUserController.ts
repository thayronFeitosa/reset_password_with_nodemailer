import { User } from '@modules/accounts/infra/entities/User';
import { container } from 'tsyringe';

import { AppSucess } from '@shared/exceptions/AppSucess';
import { statusCode } from '@shared/http/statusCode';

import { ListUserUseCase } from './ListUserUseCase';

class ListUserController {
  async handle(): Promise<User[]> {
    const listUserUseCase = container.resolve(ListUserUseCase);
    const list = await listUserUseCase.execute();

    throw new AppSucess(list, statusCode.HTTP_OK);
  }
}

export {
  ListUserController,
};
