/* eslint-disable import/no-extraneous-dependencies */
import { User } from '@modules/accounts/infra/entities/User';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListUserUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) { }

  async execute(): Promise<User[]> {
    const user = await this.userRepository.list();
    return user;
  }
}

export {
  ListUserUseCase,
};
