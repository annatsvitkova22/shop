import { ApiModelProperty } from '@nestjs/swagger';

export class CreatedUserModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    firstName?: string;
    @ApiModelProperty()
    lastName?: string;
    @ApiModelProperty()
    passwordHash?: string;
    @ApiModelProperty()
    email?: string;
    @ApiModelProperty()
    emailConfirmed?: boolean;
    @ApiModelProperty()
    message?: string;
}
