import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookModel {
    @ApiModelProperty()
    name?: string;
    @ApiModelProperty()
    description?: string;
    @ApiModelProperty()
    price?: number;
    @ApiModelProperty()
    status?: string;
    @ApiModelProperty()
    currency?: string;
    @ApiModelProperty()
    type?: string;
    @ApiModelProperty()
    author?: string;
}
