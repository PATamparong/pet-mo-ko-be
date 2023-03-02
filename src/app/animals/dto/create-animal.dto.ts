import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsNumber,
} from 'class-validator';

import { Type } from 'class-transformer';

import { AnimalDetailsDto } from './animal-details.dto';
export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsObject()
  @IsOptional()
  @Type(() => AnimalDetailsDto)
  characteristics?: object;
}
