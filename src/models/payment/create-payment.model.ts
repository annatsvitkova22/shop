import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePaymentModel {
    @ApiModelProperty()
    email?: string;
    @ApiModelProperty()
    source?: string;
    @ApiModelProperty()
    currency?: string;
    @ApiModelProperty()
    amount?: number;
}
