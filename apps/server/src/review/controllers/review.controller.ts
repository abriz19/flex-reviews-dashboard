import { Controller, Get, Query, Patch, Param, Body } from '@nestjs/common';
import { ReviewsService } from '../services';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('hostaway')
  async getHostawayReviews() {
    return this.reviewsService.getNormalizedReviews();
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
