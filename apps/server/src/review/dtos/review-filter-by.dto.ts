import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DateTimeFilter, NumberFilter, StringFilter } from 'src/common/dtos';

export class ReviewFilterByDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  guestName?: StringFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  publicReview?: StringFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => NumberFilter)
  overallRating?: NumberFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  channel?: StringFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  type?: StringFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateTimeFilter)
  submittedAt?: DateTimeFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  propertyId?: StringFilter;
}
