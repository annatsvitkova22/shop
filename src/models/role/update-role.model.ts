import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateRoleModel {
    @ApiModelProperty()
    id?: number;
    @ApiModelProperty()
    name?: string;
}
