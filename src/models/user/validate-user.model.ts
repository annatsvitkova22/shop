import { ApiModelProperty } from '@nestjs/swagger';

export class AuthenticatedUserModel {
    @ApiModelProperty()
    userId?: string;
    @ApiModelProperty()
    username?: string;
    @ApiModelProperty()
    role?: string;
    @ApiModelProperty()
    firstName?: string;
}
