import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiariosService } from './apiarios.service';
import { CrearApiarioDto } from './dto/crear-apiario.dto';
import { ActualizarApiarioDto } from './dto/actualizar-apiario.dto';

@Controller('api/apiarios')
export class ApiariosController {
  constructor(private readonly apiariosService: ApiariosService) {}

  @Get()
  obtenerTodos() {
    return this.apiariosService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.apiariosService.obtenerPorId(Number(id));
  }

  @Post()
  crear(@Body() datos: CrearApiarioDto) {
    return this.apiariosService.crear(datos);
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datos: ActualizarApiarioDto) {
    return this.apiariosService.actualizar(Number(id), datos);
  }

  @Delete(':id')
  desactivar(@Param('id') id: string) {
    return this.apiariosService.desactivar(Number(id));
  }
}