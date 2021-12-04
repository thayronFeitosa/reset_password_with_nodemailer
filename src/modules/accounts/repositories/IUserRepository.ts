import { User } from '../infra/entities/User';

interface IUserRepositoryDTO {
  id?: number;
  uuid: string;
  name: string;
  email: string;
  registerDate?: string;
  password: string;
}

interface IUserAlreadyRegistered {
  name: string;
  email: string;
}

interface IUserRepository {

  create({
    uuid, email, password, name,
  }: IUserRepositoryDTO): Promise<User>;
  list(): Promise<User[]>;
  findById(id: number): Promise<User>;
  findByuuid(uuid: string): Promise<User>;
  authenticate(email: string, password: string): Promise<User>
  userAlreadyRegistered({ name, email }: IUserAlreadyRegistered): Promise<boolean>
  findByEmail(email: string): Promise<User>;
}

export {
  IUserRepository,
  IUserRepositoryDTO,
  IUserAlreadyRegistered,
};
