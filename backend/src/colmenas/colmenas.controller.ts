import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ColmenasService } from './colmenas.service';
import { CrearColmenaDto } from './dto/crear-colmena.dto';
import { ActualizarColmenaDto } from './dto/actualizar-colmena.dto';

@Controller('api/colmenas')
export class ColmenasController {
  constructor(private readonly colmenasService: ColmenasService) {}

  @Get()
  obtenerTodas() {
    return this.colmenasService.obtenerTodas();
  }

  @Get('apiario/:apiarioId')
  obtenerPorApiario(@Param('apiarioId') apiarioId: string) {
    return this.colmenasService.obtenerPorApiario(Number(apiarioId));
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.colmenasService.obtenerPorId(Number(id));
  }

  @Post()
  crear(@Body() datos: CrearColmenaDto) {
    return this.colmenasService.crear(datos);
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datos: ActualizarColmenaDto) {
    return this.colmenasService.actualizar(Number(id), datos);
  }

  @Delete(':id')
  desactivar(@Param('id') id: string) {
    return this.colmenasService.desactivar(Number(id));
  }
}