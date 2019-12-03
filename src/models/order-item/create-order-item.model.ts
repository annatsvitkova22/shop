import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderItemModel {
    @ApiModelProperty()
    printingEditionId: string;
    @ApiModelProperty()
    amount: number;
    @ApiModelProperty()
    currency: string;
    @ApiModelProperty()
    count: number;
    @ApiModelProperty()
    orderId: string;
}
