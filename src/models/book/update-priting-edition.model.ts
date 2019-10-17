import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePrintingEditionModel {
    @ApiModelProperty()
    id?: number;
    @ApiModelProperty()
    name?: string;
    @ApiModelProperty()
    description?: string;
    @ApiModelProperty()
    price?: number;
    @ApiModelProperty()
    isRemoved?: boolean;
    @ApiModelProperty()
    status?: string;
    @ApiModelProperty()
    currency?: string;
    @ApiModelProperty()
    type?: string;
}
