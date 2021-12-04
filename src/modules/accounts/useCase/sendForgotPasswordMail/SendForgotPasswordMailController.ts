import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/exceptions/AppError';
import { statusCode } from '@shared/http/statusCode';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    if (!email) throw new AppError('Email é obrigatório', statusCode.HTTP_BAD_REQUEST);

    const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);
    await sendForgotPasswordMailUseCase.execute(email);

    return response.send();
  }
}
export {
  SendForgotPasswordMailController,
};
