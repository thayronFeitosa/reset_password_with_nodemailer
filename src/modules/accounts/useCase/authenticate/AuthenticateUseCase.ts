import { User } from '@modules/accounts/infra/entities/User';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/exceptions/AppError';

@injectable()
class AuthenticateUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,

  ) { }

  async execute(user: string, passwordRequest: string): Promise<User> {
    const isLogin = await this.userRepository.authenticate(user, passwordRequest);
    if (!isLogin) throw new AppError('E-mail ou senha inválida');

    return isLogin;
  }
}

export { AuthenticateUseCase };
