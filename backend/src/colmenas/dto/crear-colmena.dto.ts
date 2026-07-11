import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CrearColmenaDto {
  @Type(() => Number)
  @IsInt()
  apiario_id!: number;

  @IsString()
  @IsNotEmpty()
  identificador!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  estado_colmena_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  tipo_colmena_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  fuente_colmena_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  proposito_colmena_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  fuerza_colonia_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  temperamento_id?: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsDateString()
  fecha_creacion?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  numero_alzas?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  numero_cuadros?: number;

  @IsOptional()
  @IsBoolean()
  tiene_reina?: boolean;

  @IsOptional()
  @IsString()
  notas?: string;
}