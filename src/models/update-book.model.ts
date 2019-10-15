import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateBookModel {
    @ApiModelProperty()
    id?: string;
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
