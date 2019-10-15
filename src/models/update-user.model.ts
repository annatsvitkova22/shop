import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserModel {
    @ApiModelProperty()
    id?: number;
    @ApiModelProperty()
    firstName?: string;
    @ApiModelProperty()
    lastName?: string;
    @ApiModelProperty()
    passwordHash?: string;
    @ApiModelProperty()
    email?: string;
    @ApiModelProperty()
    saltRaound?: number;
}
