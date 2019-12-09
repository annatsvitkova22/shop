import { ApiModelProperty } from '@nestjs/swagger';

export class PrintingEditionCartModel {
    @ApiModelProperty()
    printingEditionId: string;
    @ApiModelProperty()
    printingEditionName: string;
    @ApiModelProperty()
    printingEditionCurrency: string;
    @ApiModelProperty()
    printingEditionPrice: number;
    @ApiModelProperty()
    printingEditionCount: number;
}
