import { Module } from '@nestjs/common';
import { ReviewsController } from './controllers';
import { ReviewsService } from './services';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewModule {}
