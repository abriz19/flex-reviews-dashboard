import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DateTimeFilter, NumberFilter, StringFilter } from 'src/common/dtos';

export class ReviewFilterByDto {
  @ApiPropertyOptional({
    description: 'Filter by guest name',
    type: StringFilter,
    example: { equals: 'John Doe' },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  guestName?: StringFilter;

  @ApiPropertyOptional({
    description: 'Filter by public review text',
    type: StringFilter,
    example: { contains: 'excellent' },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  publicReview?: StringFilter;

  @ApiPropertyOptional({
    description: 'Filter by overall rating',
    type: NumberFilter,
    example: { gte: 4 },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => NumberFilter)
  overallRating?: NumberFilter;

  @ApiPropertyOptional({
    description: 'Filter by review channel',
    type: StringFilter,
    example: { equals: 'Hostaway' },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  channel?: StringFilter;

  @ApiPropertyOptional({
    description: 'Filter by review type',
    type: StringFilter,
    example: { equals: 'guest-to-host' },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  type?: StringFilter;

  @ApiPropertyOptional({
    description: 'Filter by submission date',
    type: DateTimeFilter,
    example: { gte: '2024-01-01T00:00:00Z' },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DateTimeFilter)
  submittedAt?: DateTimeFilter;

  @ApiPropertyOptional({
    description: 'Filter by property ID',
    type: StringFilter,
    example: { equals: 'uuid-string' },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  propertyId?: StringFilter;
}
