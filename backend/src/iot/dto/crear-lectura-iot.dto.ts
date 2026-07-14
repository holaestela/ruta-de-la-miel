import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CrearLecturaIotDto {
  @IsString()
  @IsNotEmpty()
  device_uid!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  temperatura?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  humedad?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  peso?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bateria?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  senal?: number;
}