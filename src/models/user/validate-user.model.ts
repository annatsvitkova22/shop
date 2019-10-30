import { ApiModelProperty } from '@nestjs/swagger';

export interface AuthenticatedUserModel {
    userId?: string;
    username?: string;
    role?: string;
    firstName?: string;
}
