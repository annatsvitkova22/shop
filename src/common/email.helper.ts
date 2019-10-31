import { Injectable, Inject, forwardRef} from '@nestjs/common';

import * as nodemailer from 'nodemailer';

import { HashHelper } from 'src/entity';
import { UserService } from 'src/services';
import { Enviroment, getEnv } from 'src/environment/environment';
import { CreateTransportModel, MailOptionModel } from 'src/models';

const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class MailerHelper {
  constructor(
    public hashHelper: HashHelper,
    @Inject(forwardRef(() => UserService)) public userService: UserService,
  ) {}

  public async sendEmail(email: string, url: string): Promise<string> {
    try {
      const transporter: CreateTransportModel = nodemailer.createTransport({
        service: myEnvitonment.serviceMail,
        port: myEnvitonment.portMail,
        secure: myEnvitonment.secureMail,
        auth: {
          user: myEnvitonment.userMail,
          pass: myEnvitonment.passMail,
        },
      });

      const token: string = await this.hashHelper.getRandomSalt();

      const mailOptions: MailOptionModel = {
        from: myEnvitonment.userMail,
        to: email,
        subject: 'IT works',
        html: `<a href="${url}/user/${email}/${token}">Подтвердить</a>`,
      };

      await transporter.sendMail(mailOptions);

      return token;

    } catch (error) {
      const messegeError: string = error;

      return messegeError;
    }
  }
}
