import { User } from '@modules/accounts/infra/entities/User';
import { Request } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/exceptions/AppError';
import { AppSucess } from '@shared/exceptions/AppSucess';
import { statusCode } from '@shared/http/statusCode';

import { CreatUserUseCase } from './CreatUserUseCase';

class CreateUserControler {
  async handle(request: Request): Promise<User> {
    const { email, password, name } = request.body;
    console.log(request.body);

    if (!email || !password || !name) throw new AppError('Existem parâmetros obrigatórios');
    const creatUserUseCase = container.resolve(CreatUserUseCase);
    const userCreated = await creatUserUseCase.execute({ email, password, name });

    throw new AppSucess(userCreated, statusCode.HTTP_CREATED);
  }
}

export {
  CreateUserControler,
};
