import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRoleInUsersModel {
    @ApiModelProperty()
    roleId?: string;
    @ApiModelProperty()
    userId?: string;
}
