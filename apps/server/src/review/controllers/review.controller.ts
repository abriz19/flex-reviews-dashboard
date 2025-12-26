import {
  Controller,
  Get,
  Query,
  Patch,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewsService } from '../services';
import { FindManyReviewsDto } from '../dtos';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('hostaway')
  async getHostawayReviews(
    @Query(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
      }),
    )
    params: FindManyReviewsDto,
  ) {
    return this.reviewsService.getNormalizedReviews(params);
  }

  @Get('public')
  async getPublicReviews(@Query('propertyId') propertyId?: string) {
    return this.reviewsService.getPublicReviews(propertyId);
  }

  @Patch(':id/approve')
  async approveReview(
    @Param('id') id: string,
    @Body('approved') approved: boolean,
  ) {
    return this.reviewsService.setApproval(id, approved);
  }
}
