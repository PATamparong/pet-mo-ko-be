import { PartialType } from '@nestjs/swagger';
import { CreateAnimalDto } from './create-animal.dto';
import { IsString, IsOptional, IsNumber } from 'class-validator';
export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {
  @IsString()
  @IsOptional()
  furColor?: string;

  @IsString()
  @IsOptional()
  eyeColor?: string;

  @IsNumber()
  @IsOptional()
  weight?: number;
}
