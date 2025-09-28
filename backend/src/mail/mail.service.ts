import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ContextType } from 'src/common/utils/types';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async activateAccountEmail(
    email: string,
    fullName: string,
    otp: string,
    url: string,
    type: string,
    title: string,
    expire?: number,
  ) {
    await this.send(email, type, 'account', {
      fullName,
      email,
      otp,
      url,
      expire,
      type,
      title,
    });
  }

  private async send(
    email: string,
    subject: string,
    template: string,
    context: ContextType,
  ) {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: `"Ecommerce" <no-reply@ecommerce.com>`,
        subject: subject,
        template,
        context,
      });
    } catch (err) {
      console.error('Email send error:', err);

      throw new RequestTimeoutException('Failed to send activation email.');
    }
  }
}
