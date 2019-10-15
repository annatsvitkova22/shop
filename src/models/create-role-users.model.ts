import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRoleInUsersModel {
    @ApiModelProperty()
    roleId?: number;
    @ApiModelProperty()
    userId?: number;
}
