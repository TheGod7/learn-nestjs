import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async sigIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.username,
      password: user.password,
      sub: user.userId,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
