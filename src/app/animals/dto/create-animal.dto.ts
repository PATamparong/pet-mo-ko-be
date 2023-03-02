import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsNumber,
} from 'class-validator';

import { Type } from 'class-transformer';

import { AnimalDetailsDto } from './animal-details.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsObject()
  @IsOptional()
  @Type(() => AnimalDetailsDto)
  characteristics?: object;
}
