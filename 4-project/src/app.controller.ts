import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { IsAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { AuthFilter } from './auth/filter/auth.filter';

@Controller()
@UseFilters(AuthFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Req() req: Request, @Res() res: Response) {
    res.render('index', {
      logIn: req.isAuthenticated(),
    });
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('/profile')
  profile(@Req() req: Request, @Res() res: Response) {
    res.render('profile', {
      user: req.user,
    });
  }
}
