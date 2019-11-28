import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAuthorModel {
    @ApiModelProperty()
    name: string;
}
