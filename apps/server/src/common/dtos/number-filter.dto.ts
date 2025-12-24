import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { INumberFilter } from '../interfaces';
import { Type } from 'class-transformer';

export class NumberFilter implements INumberFilter {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  equals?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lt?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lte?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  gt?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  gte?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  in?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  notIn?: number[];

  @IsOptional()
  @ValidateNested()
  @Type(() => NumberFilter)
  not?: NumberFilter;
}
