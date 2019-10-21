import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateRoleModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    name?: string;
}
