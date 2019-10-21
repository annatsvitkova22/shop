import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePaymentModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    transactionId?: string;
}
