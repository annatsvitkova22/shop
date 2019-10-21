import { Injectable, Inject, forwardRef} from '@nestjs/common';

import { HashHelper } from 'src/entity';
import { UserService } from 'src/services';

const nodemailer = require('nodemailer');

@Injectable()
export class MailerHelper {
  constructor(
    public hashHelper: HashHelper,
    @Inject(forwardRef(() => UserService)) public userService: UserService,
  ) {}

  public async sendEmail(email: string, url: string): Promise<string> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: 'tsvitkova.work@gmail.com',
        pass: 'elofon7302',
      },
    });
    const token = await this.hashHelper.getRandomSalt();

    const mailOptions = {
      from: 'tsvitkova.work@gmail.com',
      to: email,
      subject: 'IT works',
      text: `\n ${url}/user/validateCode?mail=${email}&token=${token} \n`,
    };

    transporter.sendMail(mailOptions);

    return token;
  }
}
