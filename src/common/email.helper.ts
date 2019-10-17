import { Injectable } from '@nestjs/common';
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter;

  public async sendMail(sendMailOptions): Promise<SentMessageInfo> {

    return await this.transporter.sendMail(sendMailOptions);
  }
}
