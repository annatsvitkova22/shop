import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePaymentModel {
    @ApiModelProperty()
    id?: number;
    @ApiModelProperty()
    transactionId?: string;
}
