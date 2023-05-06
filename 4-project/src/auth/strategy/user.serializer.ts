import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User, UsersService } from '../../users/users.service';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: string, payload: string) => void) {
    done(null, user.username);
  }

  deserializeUser(
    username: string,
    done: (err: string, payload: User) => void,
  ) {
    const user = this.usersService.findByUsername(username);

    if (!user) {
      return done("Could not deserialize user because don't exist", null);
    }

    done(null, user);
  }
}
