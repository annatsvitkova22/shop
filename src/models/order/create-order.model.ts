import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderModel {
    @ApiModelProperty()
    description?: string;
    @ApiModelProperty()
    userId?: string;
    @ApiModelProperty({
        example: new Date(Date.now()),
        type: String,
        required: true,
    })
    date?: Date;
    @ApiModelProperty()
    paymentId?: string;
}
