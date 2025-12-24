import { Type } from 'class-transformer';
import { IsDate, IsOptional, ValidateNested } from 'class-validator';
import { IDateTimeFilter } from '../interfaces';

export class DateTimeFilter implements IDateTimeFilter {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  equals?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lte?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  gt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  gte?: Date;

  @IsOptional()
  @IsDate({ each: true })
  @Type(() => Date)
  in?: Date[];

  @IsOptional()
  @IsDate({ each: true })
  @Type(() => Date)
  notIn?: Date[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DateTimeFilter)
  not?: DateTimeFilter;
}
