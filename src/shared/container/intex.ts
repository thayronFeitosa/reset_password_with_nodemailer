import { UserRepository } from '@modules/accounts/infra/reoisitories/UserRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/reoisitories/UsersTokensRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { container } from 'tsyringe';
import '@shared/container/providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUsersTokensRepository>('UsersTokensRepository', UsersTokensRepository);
