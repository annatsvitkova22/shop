import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAuthorModel {
    @ApiModelProperty()
    isRemoved?: string;
    @ApiModelProperty()
    name?: string;
}
