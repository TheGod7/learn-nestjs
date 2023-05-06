import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { AuthService } from './auth.service';
import { AuthFilter } from './filter/auth.filter';

@Controller('auth')
@UseFilters(AuthFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  loginRender(@Res() res: Response) {
    return res.render('login');
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res: Response) {
    res.redirect('/profile');
  }

  @UseGuards(IsAuthenticatedGuard)
  @Post('logout')
  async logout(@Req() request: Request, @Res() res: Response) {
    return this.authService.Logout(request, res);
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('protected')
  protected(@Req() req: Request) {
    return {
      message: req.user,
    };
  }
}
