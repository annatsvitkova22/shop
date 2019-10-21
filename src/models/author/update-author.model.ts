import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAuthorModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    name?: string;
}
