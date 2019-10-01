import { Injectable } from '@nestjs/common';
import { ApiModelProperty, ApiProduces } from '@nestjs/swagger';

export class User {
  @ApiModelProperty()
  userId: number;
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  password: string;
  @ApiModelProperty()
  role: string
}

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        role: 'admin',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        role: 'user',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        role: 'super admin',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    const find_user = this.users.find(user => user.username === username);
    return find_user;
  }
}
