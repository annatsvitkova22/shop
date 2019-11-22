import { ApiModelProperty } from '@nestjs/swagger';

export class User {
    @ApiModelProperty()
    userId: string;
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    password: string;
    @ApiModelProperty()
    role: string;
  }
