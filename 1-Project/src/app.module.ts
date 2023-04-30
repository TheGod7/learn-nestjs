import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
