import { Type, Transform } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';
import { ReviewFilterByDto } from './review-filter-by.dto';
import { ReviewOrderByDto } from './review-order-by.dto';

export class FindManyReviewsDto extends PaginationDto {
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
