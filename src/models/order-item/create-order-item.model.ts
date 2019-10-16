import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderItemModel {
    @ApiModelProperty()
    pritingEditionId?: number;
    @ApiModelProperty()
    count?: number;
}
