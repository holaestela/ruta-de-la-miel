import { PartialType } from '@nestjs/mapped-types';
import { CrearDispositivoDto } from './crear-dispositivo.dto';

export class ActualizarDispositivoDto extends PartialType(CrearDispositivoDto) {}