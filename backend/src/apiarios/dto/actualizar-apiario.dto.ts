import { PartialType } from '@nestjs/mapped-types';
import { CrearApiarioDto } from './crear-apiario.dto';

export class ActualizarApiarioDto extends PartialType(CrearApiarioDto) {}