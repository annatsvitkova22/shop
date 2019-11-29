import { ApiModelProperty } from '@nestjs/swagger';

export class PrintingEditionFilterModel {
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    priceMin: number;
    @ApiModelProperty()
    priceMax: number;
    @ApiModelProperty()
    status: string;
}
