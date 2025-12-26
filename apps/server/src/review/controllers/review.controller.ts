import {
  Controller,
  Get,
  Query,
  Patch,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ReviewsService } from '../services';
import { FindManyReviewsDto, ApproveReviewDto } from '../dtos';
import {
  PaginatedReviewResponseDto,
  ReviewResponseDto,
} from '../dtos/review-response.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('hostaway')
  @ApiOperation({
    summary: 'Get paginated and filtered reviews from Hostaway',
    description: `
      Retrieves a paginated list of reviews with filtering and sorting capabilities.
      
      **Query Parameters:**
      - \`page\`: Page number (default: 1)
      - \`pageSize\`: Items per page (default: 25, max: 100)
      - \`search\`: Search term for guestName or publicReview fields
      - \`filterBy\`: JSON stringified object for filtering (see ReviewFilterByDto)
      - \`orderBy\`: JSON stringified object for sorting (see ReviewOrderByDto)
      
      **FilterBy Example (as JSON string):**
      \`\`\`json
      {
        "propertyId": { "equals": "uuid-string" },
        "overallRating": { "gte": 4 },
        "channel": { "equals": "Hostaway" },
        "createdAt": { "gte": "2024-01-01T00:00:00Z" }
      }
      \`\`\`
      
      **OrderBy Example (as JSON string):**
      \`\`\`json
      {
        "createdAt": "desc",
        "overallRating": "asc"
      }
      \`\`\`
      
      **Note:** filterBy and orderBy must be URL-encoded JSON strings when sent as query parameters.
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved paginated reviews',
    type: PaginatedReviewResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid query parameters',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Items per page (default: 25, max: 100)',
    example: 25,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term for guestName or publicReview fields',
    example: 'John',
  })
  @ApiQuery({
    name: 'filterBy',
    required: false,
    type: String,
    description: `
      JSON stringified filter object. Must be URL-encoded.
      Example: {"propertyId":{"equals":"uuid"},"overallRating":{"gte":4}}
      URL-encoded: %7B%22propertyId%22%3A%7B%22equals%22%3A%22uuid%22%7D%7D
    `,
    example:
      '{"propertyId":{"equals":"uuid-string"},"overallRating":{"gte":4}}',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: String,
    description: `
      JSON stringified sort object. Must be URL-encoded.
      Example: {"createdAt":"desc","overallRating":"asc"}
      URL-encoded: %7B%22createdAt%22%3A%22desc%22%7D
    `,
    example: '{"createdAt":"desc"}',
  })
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
  @ApiOperation({
    summary: 'Get public (approved) reviews',
    description: `
      Retrieves all approved reviews, optionally filtered by property ID.
      Only reviews with \`isApproved: true\` are returned.
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved public reviews',
    type: [ReviewResponseDto],
  })
  @ApiQuery({
    name: 'propertyId',
    required: false,
    type: String,
    description: 'Optional property ID to filter reviews',
    example: 'uuid-string',
  })
  async getPublicReviews(@Query('propertyId') propertyId?: string) {
    return this.reviewsService.getPublicReviews(propertyId);
  }

  @Patch(':id/approve')
  @ApiOperation({
    summary: 'Approve or reject a review',
    description: `
      Toggles the approval status of a review.
      - \`approved: true\` → Sets review status to 'published'
      - \`approved: false\` → Sets review status to 'pending'
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Review ID (UUID)',
    type: String,
    example: 'uuid-string',
  })
  @ApiBody({
    type: ApproveReviewDto,
    description: 'Approval status',
  })
  @ApiResponse({
    status: 200,
    description: 'Review approval status updated successfully',
    type: ReviewResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid review ID or body',
  })
  @ApiResponse({
    status: 404,
    description: 'Review not found',
  })
  async approveReview(
    @Param('id') id: string,
    @Body() approveDto: ApproveReviewDto,
  ) {
    return this.reviewsService.setApproval(id, approveDto.approved);
  }
}
