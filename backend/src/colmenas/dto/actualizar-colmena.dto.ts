import { PartialType } from '@nestjs/mapped-types';
import { CrearColmenaDto } from './crear-colmena.dto';

export class ActualizarColmenaDto extends PartialType(CrearColmenaDto) {}