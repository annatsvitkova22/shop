export interface CreateTransportModel {
  sendMail(mailOptions: import("./mail-option.model").MailOptionModel);
    service?: string;
    port?: string;
    subject?: string;
    secure?: string;
    auth?: {
        user?: string;
        pass?: string;
    };
}
