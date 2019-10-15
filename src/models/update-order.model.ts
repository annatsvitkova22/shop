import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateOrderModel {
    @ApiModelProperty()
    id?: number;
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
