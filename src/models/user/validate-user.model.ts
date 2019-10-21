import { ApiModelProperty } from '@nestjs/swagger';

export class ValidateUser {
    @ApiModelProperty()
    userId?: string;
    @ApiModelProperty()
    username?: string;
    @ApiModelProperty()
    role?: string;
    @ApiModelProperty()
    firstName?: string;
}
