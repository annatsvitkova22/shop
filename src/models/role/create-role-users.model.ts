import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRoleInUsersModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    roleId?: string;
    @ApiModelProperty()
    userId?: string;
}
