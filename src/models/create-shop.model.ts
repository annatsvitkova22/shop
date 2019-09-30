import { ApiModelProperty } from '@nestjs/swagger';

export class CreateShopModel {
  @ApiModelProperty()
  name?: string;
  @ApiModelProperty()
  age?: number;
  @ApiModelProperty()
  breed?: string;
}
