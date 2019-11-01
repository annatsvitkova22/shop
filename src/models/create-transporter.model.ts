export interface CreateTransporterModel {
  sendMail(mailOptions: import('src/models/mail-option.model').MailOptionModel);
    servise?: string;
    port?: number;
    secure?: string;
    auth?: {
        user?: string;
        pass?: string;
    };
}
