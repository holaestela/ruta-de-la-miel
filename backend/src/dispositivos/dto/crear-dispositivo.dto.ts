import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CrearDispositivoDto {
  @IsString()
  @IsNotEmpty()
  device_uid!: string;

  @Type(() => Number)
  @IsInt()
  apiario_id!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  colmena_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  tipo_dispositivo_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  estado_dispositivo_id?: number;

  @IsOptional()
  @IsDateString()
  fecha_instalacion?: string;

  @IsOptional()
  @IsString()
  firmware_version?: string;

  @IsOptional()
  @IsString()
  api_key?: string;

  @IsOptional()
  @IsString()
  notas?: string;
}