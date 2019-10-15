import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePaymentModel {
    @ApiModelProperty()
    transactionId?: number;
}
