import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { create } from 'express-handlebars';
import { join } from 'path';

import { ConfigService } from '@nestjs/config';

import method = require('method-override');
import * as session from 'express-session';
import * as passport from 'passport';
import flash = require('connect-flash');
import { NextFunction, Request, Response } from 'express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, '..', 'views', 'layouts'),
    partialsDir: join(__dirname, '..', 'views', 'partials'),
  });

  app.engine('hbs', hbs.engine);

  app.setViewEngine('hbs');

  app.use(method('_method'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: configService.get('SECRET_SESSION'),
      resave: true,
      saveUninitialized: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.error = req.flash('error');
    res.locals.done = req.flash('done');
    res.locals.user = req['user'];

    next();
  });

  await app.listen(3000);
}
bootstrap();
