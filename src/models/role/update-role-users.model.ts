import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateRoleInUsersModel {
    @ApiModelProperty()
    roleId?: string;
    @ApiModelProperty()
    userId?: string;
}
