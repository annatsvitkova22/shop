import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateRoleInUsersModel {
    @ApiModelProperty()
    id?: number;
    @ApiModelProperty()
    roleId?: number;
    @ApiModelProperty()
    userId?: number;
}
