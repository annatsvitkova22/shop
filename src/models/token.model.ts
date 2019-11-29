import { ApiModelProperty, ApiProduces } from '@nestjs/swagger';

export class TokenModel {
  @ApiModelProperty()
  @ApiProduces()
  accessToken: string;
  @ApiModelProperty()
  refreshToken: string;
}
