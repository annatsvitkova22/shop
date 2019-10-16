import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAuthorModel {
    @ApiModelProperty()
    id?: number;
    @ApiModelProperty()
    name?: string;
}
