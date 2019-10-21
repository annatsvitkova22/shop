import { Injectable, Inject, forwardRef} from '@nestjs/common';

import { HashHelper } from 'src/entity';
import { UserService } from 'src/services';
import * as nodemailer from 'nodemailer';
import { Enviroment, getEnv } from 'src/environment/environment';

const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class MailerHelper {
  constructor(
    public hashHelper: HashHelper,
    @Inject(forwardRef(() => UserService)) public userService: UserService,
  ) {}

  public async sendEmail(email: string, url: string): Promise<string> {
    const transporter = nodemailer.createTransport({
      service: myEnvitonment.secureMail,
      port: myEnvitonment.portMail,
      secure: myEnvitonment.secureMail,
      auth: {
        user: myEnvitonment.userMail,
        pass: myEnvitonment.passMail,
      },
    });
    const token = await this.hashHelper.getRandomSalt();

    const mailOptions = {
      from: myEnvitonment.userMail,
      to: email,
      subject: 'IT works',
      text: `\n ${url}/user/validateCode?mail=${email}&token=${token} \n`,
    };

    transporter.sendMail(mailOptions);

    return token;
  }
}
