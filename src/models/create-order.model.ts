import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderModel {
    @ApiModelProperty()
    description?: string;
    @ApiModelProperty()
    userId?: number;
    @ApiModelProperty({
        example: new Date(Date.now()),
        type: String,
        required: true,
    })
    date?: Date;
    @ApiModelProperty()
    paymentId?: number;
}
