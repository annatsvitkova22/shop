import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateShopModel {
    @ApiModelProperty()
    name?: string;
    @ApiModelProperty()
    age?: number;
    @ApiModelProperty()
    breed?: string;
}
