import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DispositivosService } from './dispositivos.service';
import { CrearDispositivoDto } from './dto/crear-dispositivo.dto';
import { ActualizarDispositivoDto } from './dto/actualizar-dispositivo.dto';

@Controller('api/dispositivos')
export class DispositivosController {
  constructor(private readonly dispositivosService: DispositivosService) {}

  @Get()
  obtenerTodos() {
    return this.dispositivosService.obtenerTodos();
  }

  @Get('colmena/:colmenaId')
  obtenerPorColmena(@Param('colmenaId') colmenaId: string) {
    return this.dispositivosService.obtenerPorColmena(Number(colmenaId));
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.dispositivosService.obtenerPorId(Number(id));
  }

  @Post()
  crear(@Body() datos: CrearDispositivoDto) {
    return this.dispositivosService.crear(datos);
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datos: ActualizarDispositivoDto) {
    return this.dispositivosService.actualizar(Number(id), datos);
  }

  @Delete(':id')
  desactivar(@Param('id') id: string) {
    return this.dispositivosService.desactivar(Number(id));
  }
}