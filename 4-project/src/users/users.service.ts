import { Injectable } from '@nestjs/common';

export interface User {
  username: string;
  pets: [{ name: string; animal: string }];
  password: string;
}

@Injectable()
export class UsersService {
  private readonly mockedUsers: User[] = [
    {
      username: 'Alice',
      pets: [{ name: 'moon', animal: 'cat' }],
      password: 'pass',
    },
    {
      username: 'Bob',
      pets: [{ name: 'charley', animal: 'dog' }],
      password: 'pass',
    },
  ];

  findByUsername(username: string): User | null {
    return this.mockedUsers.find((user) => user.username === username);
  }
}
