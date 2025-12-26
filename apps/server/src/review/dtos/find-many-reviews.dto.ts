import { Type, Transform } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos';
import { ReviewFilterByDto } from './review-filter-by.dto';
import { ReviewOrderByDto } from './review-order-by.dto';

export class FindManyReviewsDto extends PaginationDto {
  @ApiPropertyOptional({
    description: `
      Filter object as JSON string (will be parsed automatically).
      Must be URL-encoded when sent as query parameter.
      Example: {"propertyId":{"equals":"uuid"},"overallRating":{"gte":4}}
    `,
    type: String,
    example:
      '{"propertyId":{"equals":"uuid-string"},"overallRating":{"gte":4}}',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ReviewFilterByDto)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  filterBy?: ReviewFilterByDto;

  @ApiPropertyOptional({
    description: `
      Sort object as JSON string (will be parsed automatically).
      Must be URL-encoded when sent as query parameter.
      Example: {"createdAt":"desc","overallRating":"asc"}
    `,
    type: String,
    example: '{"createdAt":"desc"}',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ReviewOrderByDto)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  orderBy?: ReviewOrderByDto;
}
