import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderItemModel {
    @ApiModelProperty()
    pritingEditionId?: number;
    @ApiModelProperty()
    amount?: number;
    @ApiModelProperty()
    currency?: string;
    @ApiModelProperty()
    count?: number;
}
