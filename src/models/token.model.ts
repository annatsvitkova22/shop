import { ApiModelProperty, ApiProduces } from '@nestjs/swagger';

export class Token {
    @ApiModelProperty()
    @ApiProduces()
    accessToken: string;
    @ApiModelProperty()
    refreshToken: string;
  }
