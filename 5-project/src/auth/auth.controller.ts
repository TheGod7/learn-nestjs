import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersDTO } from 'src/users/dto/users.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IsAuthenticatedGuard } from './guards/is-authenticate.guard';
import { AuthFilter } from './filter/auth.filter';

@UseFilters(AuthFilter)
@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async register(
    @Body() body: UsersDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.userService.register(body, req, res);
  }
  @Get('login')
  @Render('pages/user/Login')
  renderLogin() {
    return { title: 'Login' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res: Response) {
    return res.redirect(303, '/notes');
  }

  @Get('register')
  @Render('pages/user/Register')
  renderRegister() {
    return { title: 'Register' };
  }

  @Get('logout')
  @UseGuards(IsAuthenticatedGuard)
  @Redirect('/')
  logout(@Req() req: Request) {
    return req.logOut((error) => {
      if (error) {
        req.flash('error', error);
      }
    });
  }
}
