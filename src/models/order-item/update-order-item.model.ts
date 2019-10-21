import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateOrderItemModel {
    @ApiModelProperty()
    id?: number;
    @ApiModelProperty()
    pritingEditionId?: number;
    @ApiModelProperty()
    amount?: number;
    @ApiModelProperty()
    currency?: string;
    @ApiModelProperty()
    count?: number;
}
