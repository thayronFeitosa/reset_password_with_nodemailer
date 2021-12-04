import { IUserAlreadyRegistered, IUserRepository, IUserRepositoryDTO } from '@modules/accounts/repositories/IUserRepository';
import { compare } from 'bcrypt';
import { getRepository, Repository } from 'typeorm';

import { AppError } from '@shared/exceptions/AppError';

import { User } from '../entities/User';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async userAlreadyRegistered({ name, email }: IUserAlreadyRegistered): Promise<boolean> {
    if (await this.repository.findOne({ name })) return true;
    if (await this.repository.findOne({ email })) return true;
    return false;
  }
  async create({
    uuid, email, password, name,
  }: IUserRepositoryDTO): Promise<User> {
    const created = this.repository.create({
      uuid, email, password, name,
    });
    const user = await this.repository.save(created);
    return user;
  }

  async list(): Promise<User[]> {
    const list = await this.repository.find();
    return list;
  }

  async findById(id: number): Promise<User> {
    const find = await this.repository.findOne({ id });
    return find;
  }

  async findByuuid(uuid: string): Promise<User> {
    const find = await this.repository.findOne({ uuid });
    return find;
  }

  async authenticate(email: string, passwordRequest: string): Promise<User> {
    const isUser = await this.repository.findOne({ email });

    if (!isUser) throw new AppError('Ocorreu um erro ao fazer login, cheque as credenciais.');

    const { password } = isUser;
    const passwordMatch = await compare(passwordRequest, password);

    if (!passwordMatch) throw new AppError('Ocorreu um erro ao fazer login, cheque as credenciais.');

    return isUser;
  }
}

export {
  UserRepository,
};
