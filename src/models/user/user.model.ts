import { ApiModelProperty, ApiProduces } from '@nestjs/swagger';

export class User {
    @ApiModelProperty()
    userId: number;
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    password: string;
    @ApiModelProperty()
    role: string;
  }
