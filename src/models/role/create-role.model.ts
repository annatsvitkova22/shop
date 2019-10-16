import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRoleModel {
    @ApiModelProperty()
    name?: string;
}
