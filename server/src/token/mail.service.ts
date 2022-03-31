import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendActivationMail(to: string, link: string) {
    return await this.mailerService.sendMail({
      from: this.configService.get('SMTP_USER'),
      to,
      subject: 'Активация аккаунта на ' + this.configService.get('SERVER_URL'),
      html: `
            <div>
              <h1>Для активации перейдите по ссылке</h1>
              <a href="${link}">${link}</a>
            </div>`,
    });
  }
}
