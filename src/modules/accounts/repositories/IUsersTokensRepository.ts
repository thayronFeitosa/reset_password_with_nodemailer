import { UserTokens } from '../infra/entities/UserTokens';

interface ICreateUserTokenDTO {
  id?: number;
  user_id: number;
  expires_date: Date;
  refresh_token: string;
}

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: number,
    refresh_token: string
  ): Promise<UserTokens>;

  deleteById(id: number): Promise<void>;

  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository, ICreateUserTokenDTO };
