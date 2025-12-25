import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './review/review.module';
import { PrismaModule } from './prisma/prisma.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [ReviewModule, PrismaModule, PropertyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
