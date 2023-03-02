import { IsString, IsOptional, IsNumber } from 'class-validator';

export class AnimalDetailsDto {
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
