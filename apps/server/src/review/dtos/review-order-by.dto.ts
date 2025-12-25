import { IsEnum, IsOptional } from 'class-validator';

export const OrderDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type OrderDirection =
  (typeof OrderDirection)[keyof typeof OrderDirection];

export class ReviewOrderByDto {
  @IsEnum(OrderDirection)
  @IsOptional()
  createdAt?: OrderDirection;

  @IsEnum(OrderDirection)
  @IsOptional()
  updatedAt?: OrderDirection;

  @IsEnum(OrderDirection)
  @IsOptional()
  overallRating?: OrderDirection;

  @IsEnum(OrderDirection)
  @IsOptional()
  guestName?: OrderDirection;

  @IsEnum(OrderDirection)
  @IsOptional()
  channel?: OrderDirection;

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
