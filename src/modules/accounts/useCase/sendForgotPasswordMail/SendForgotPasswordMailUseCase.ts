/* eslint-disable import/no-extraneous-dependencies */
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { resolve } from 'path';
import { injectable, inject } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/exceptions/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  UsersTokensRepository
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UsersTokensRepository') private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('EtherealMailProvider') private iMailProvider: IMailProvider,
  ) { }

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('Usuário não existe!');

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    await this.iMailProvider.sendMail(
      email,
      'Recuperação de Senha',
      variables,
      templatePath,
    );
  }
}

export { SendForgotPasswordMailUseCase };
