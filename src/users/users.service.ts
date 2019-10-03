import { Injectable } from '@nestjs/common';
import { User } from 'src/models';

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
    const findUser = this.users.find(user => user.username === username);
    return findUser;
  }
}
