import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  validateUser(username: string, password: string): User {
    const user = this.usersService.findByUsername(username);

    if (!user && user.password !== password) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async Logout(req: Request, res: Response): Promise<void> {
    const logoutError = await new Promise((resolve) => {
      req.logOut({ keepSessionInfo: false }, (err) => {
        resolve(err);
      });
    });

    if (logoutError) {
      console.log(logoutError);

      throw new InternalServerErrorException('Could log the user!');
    }

    return res.redirect('/');
  }
}
