import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { IStringFilter } from '../interfaces';
import { Type } from 'class-transformer';

export class StringFilter implements IStringFilter {
  @IsOptional()
  @IsString()
  equals?: string;

  @IsOptional()
  @IsString()
  contains?: string;

  @IsOptional()
  @IsString()
  startsWith?: string;

  @IsOptional()
  @IsString()
  endsWith?: string;

  @IsOptional()
  @IsString({ each: true })
  in?: string[];

  @IsOptional()
  @IsString({ each: true })
  notIn?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilter)
  not?: StringFilter;
}
