import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateRoleInUsersModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    roleId?: string;
    @ApiModelProperty()
    userId?: string;
}
