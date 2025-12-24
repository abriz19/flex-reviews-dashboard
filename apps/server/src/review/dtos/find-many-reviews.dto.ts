import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';
import { ReviewFilterByDto } from './review-filter-by.dto';
import { ReviewOrderByDto } from './review-order-by.dto';

export class FindReviewsDto extends PaginationDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => ReviewFilterByDto)
  filterBy?: ReviewFilterByDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ReviewOrderByDto)
  orderBy?: ReviewOrderByDto;
}
