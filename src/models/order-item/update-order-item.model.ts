import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateOrderItemModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    pritingEditionId?: string;
    @ApiModelProperty()
    amount?: number;
    @ApiModelProperty()
    currency?: string;
    @ApiModelProperty()
    count?: number;
}
