import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewResponseDto {
  @ApiProperty({ description: 'Review ID', example: 'uuid-string' })
  id: string;

  @ApiProperty({ description: 'Property ID', example: 'uuid-string' })
  propertyId: string;

  @ApiProperty({ description: 'Guest name', example: 'John Doe' })
  guestName: string;

  @ApiPropertyOptional({
    description: 'Public review text',
    example: 'Great stay! Everything was perfect.',
    nullable: true,
  })
  publicReview?: string | null;

  @ApiPropertyOptional({
    description: 'Review categories with ratings',
    example: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 4 },
    ],
  })
  reviewCategory?: Array<{ category: string; rating: number }>;

  @ApiPropertyOptional({
    description: 'Flattened categories object',
    example: { cleanliness: 5, communication: 4 },
  })
  categories?: Record<string, number>;

  @ApiProperty({
    description: 'Overall rating (average of categories)',
    example: 4.5,
    nullable: true,
  })
  overallRating: number | null;

  @ApiProperty({
    description: 'Rating alias for frontend compatibility',
    example: 4.5,
  })
  rating: number;

  @ApiProperty({
    description: 'Review type',
    example: 'guest-to-host',
    enum: ['guest-to-host', 'host-to-guest'],
  })
  type: string;

  @ApiProperty({
    description: 'Review channel',
    example: 'Hostaway',
  })
  channel: string;

  @ApiProperty({
    description: 'Whether the review is approved for public display',
    example: true,
  })
  isApproved: boolean;

  @ApiProperty({
    description: 'Review status',
    example: 'published',
    enum: ['published', 'pending', 'declined'],
  })
  status: string;

  @ApiProperty({ description: 'Creation date', example: '2024-12-14T10:15:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date', example: '2024-12-14T10:15:00Z' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Submission date (ISO string)',
    example: '2024-12-14T10:15:00.000Z',
  })
  submittedAt: string;

  @ApiProperty({ description: 'Property listing name', example: 'Central Flat in Spitalfields' })
  listingName: string;

  @ApiProperty({ description: 'Property listing ID', example: 'uuid-string' })
  listingId: string;

  @ApiPropertyOptional({
    description: 'Property details',
    type: Object,
    additionalProperties: true,
  })
  property?: any;
}

export class PaginatedReviewResponseDto {
  @ApiProperty({
    description: 'Array of review items',
    type: [ReviewResponseDto],
  })
  items: ReviewResponseDto[];

  @ApiProperty({ description: 'Total number of reviews', example: 100 })
  total: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  currentPage: number;

  @ApiProperty({ description: 'Number of items per page', example: 25 })
  pageSize: number;

  @ApiProperty({ description: 'Total number of pages', example: 4 })
  totalPages: number;
}

