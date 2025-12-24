import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './review/review.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ReviewModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
