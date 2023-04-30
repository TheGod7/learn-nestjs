import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_URI } from './configs/dotenv';

@Module({
  imports: [ProductModule, MongooseModule.forRoot(MONGOOSE_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
