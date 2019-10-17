import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePrintingEditionModel {
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
