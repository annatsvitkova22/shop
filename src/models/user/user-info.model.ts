import { ApiModelProperty } from '@nestjs/swagger';
import { User } from 'src/entity';
import { CreateUserModel } from './create-user.model';

export class UserInfoModel {
    @ApiModelProperty()
    user?: User;
    @ApiModelProperty()
    userCreateModel?: CreateUserModel;
    @ApiModelProperty()
    message?: string;
}
