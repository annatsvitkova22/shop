import { ApiModelProperty, ApiProduces } from '@nestjs/swagger';

export class AccessTokenModel {
    @ApiModelProperty()
    @ApiProduces()
    accessToken: string;
}
