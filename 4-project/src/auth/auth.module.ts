import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from '../users/users.module';
import { UserSerializer } from './strategy/user.serializer';

@Module({
  imports: [UsersModule],
  providers: [AuthService, LocalStrategy, UserSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
