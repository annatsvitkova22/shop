import { ApiModelProperty } from '@nestjs/swagger';

export class ValidateUser {
    @ApiModelProperty()
    userId?: number;
    @ApiModelProperty()
    username?: string;
    @ApiModelProperty()
    role?: string;
    @ApiModelProperty()
    firstName?: string;
}
