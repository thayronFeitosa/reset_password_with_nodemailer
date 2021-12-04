import { User } from '@modules/accounts/infra/entities/User';
import { Request } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/exceptions/AppError';
import { AppSucess } from '@shared/exceptions/AppSucess';
import { statusCode } from '@shared/http/statusCode';

import { AuthenticateUseCase } from './AuthenticateUseCase';

class AuthenticateController {
  async handle(request: Request): Promise<User> {
    const { email, password } = request.body;
    if (!email || !password) throw new AppError('Usuário e senha são obrigatorios!');

    const authenticateUseCase = container.resolve(AuthenticateUseCase);
    const loginUser = await authenticateUseCase.execute(email, password);

    throw new AppSucess(loginUser, statusCode.HTTP_OK);
  }
}

export { AuthenticateController };
