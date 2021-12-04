/* eslint-disable import/no-extraneous-dependencies */
import { User } from '@modules/accounts/infra/entities/User';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { AppError } from '@shared/exceptions/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreatUserUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) { }

  async execute({ name, email, password }: IRequest): Promise<User> {
    if (await this.userRepository.userAlreadyRegistered({ name, email })) throw new AppError('Usuário já existe');
    const user = await this.userRepository.create({
      uuid: uuidV4(),
      name,
      email,
      password: await hash(password, 10),
    });

    return user;
  }
}

export {
  CreatUserUseCase,
};
