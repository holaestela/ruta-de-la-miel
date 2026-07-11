import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearApiarioDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  tipo_apiario_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  exposicion_solar_id?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  codigo_postal?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  provincia?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pais_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitud?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitud?: number;
}