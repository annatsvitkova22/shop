import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAuthorMongoModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    name?: string;
}
