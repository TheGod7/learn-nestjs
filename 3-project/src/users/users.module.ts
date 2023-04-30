/*
https://docs.nestjs.com/modules
*/

import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
