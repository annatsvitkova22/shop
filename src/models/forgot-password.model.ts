import { ApiModelProperty, ApiProduces } from '@nestjs/swagger';

export class ForgotPassword {
    @ApiModelProperty()
    @ApiProduces()
    email: string;
    @ApiModelProperty()
    password: string;
    @ApiModelProperty()
    repeatPassword: string;
}
