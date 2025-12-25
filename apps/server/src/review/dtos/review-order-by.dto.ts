import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export const OrderDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type OrderDirection =
  (typeof OrderDirection)[keyof typeof OrderDirection];

export class ReviewOrderByDto {
  @ApiPropertyOptional({
    description: 'Sort by creation date',
    enum: OrderDirection,
    example: 'desc',
  })
  @IsEnum(OrderDirection)
  @IsOptional()
  createdAt?: OrderDirection;

  @ApiPropertyOptional({
    description: 'Sort by update date',
    enum: OrderDirection,
    example: 'desc',
  })
  @IsEnum(OrderDirection)
  @IsOptional()
  updatedAt?: OrderDirection;

  @ApiPropertyOptional({
    description: 'Sort by overall rating',
    enum: OrderDirection,
    example: 'desc',
  })
  @IsEnum(OrderDirection)
  @IsOptional()
  overallRating?: OrderDirection;

  @ApiPropertyOptional({
    description: 'Sort by guest name',
    enum: OrderDirection,
    example: 'asc',
  })
  @IsEnum(OrderDirection)
  @IsOptional()
  guestName?: OrderDirection;

  @ApiPropertyOptional({
    description: 'Sort by channel',
    enum: OrderDirection,
    example: 'asc',
  })
  @IsEnum(OrderDirection)
  @IsOptional()
  channel?: OrderDirection;

  @ApiPropertyOptional({
    description: 'Sort by property fields (nested)',
    type: Object,
    example: { listingName: 'asc' },
    additionalProperties: true,
  })
  // Allow nested property sorting (property_listingName becomes property: { listingName: 'asc' })
  @IsOptional()
  property?: {
    listingName?: OrderDirection;
    name?: OrderDirection;
    [key: string]: any;
  };

  // Allow underscore-separated keys that will be transformed by the helper
  // This allows property_listingName, property_name, etc.
  [key: string]: any;
}
