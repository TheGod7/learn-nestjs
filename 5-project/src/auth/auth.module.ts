import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { userSerializer } from './strategy/session.serialize';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    UsersModule,
  ],

  providers: [AuthService, LocalStrategy, userSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
