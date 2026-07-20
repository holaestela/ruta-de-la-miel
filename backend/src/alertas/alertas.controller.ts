import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AlertasService } from './alertas.service';

@Controller('api/alertas')
export class AlertasController {
  constructor(private readonly alertasService: AlertasService) {}

  @Get()
  obtenerTodas() {
    return this.alertasService.obtenerTodas();
  }

  @Get('pendientes')
  obtenerPendientes() {
    return this.alertasService.obtenerPendientes();
  }

  @Get('atendidas')
  obtenerAtendidas() {
    return this.alertasService.obtenerAtendidas();
  }

  @Get('colmena/:colmenaId')
  obtenerPorColmena(@Param('colmenaId') colmenaId: string) {
    return this.alertasService.obtenerPorColmena(Number(colmenaId));
  }

  @Get('apiario/:apiarioId')
  obtenerPorApiario(@Param('apiarioId') apiarioId: string) {
    return this.alertasService.obtenerPorApiario(Number(apiarioId));
  }

  @Patch(':id/atender')
  marcarComoAtendida(
    @Param('id') id: string,
    @Body('observaciones') observaciones?: string,
  ) {
    return this.alertasService.marcarComoAtendida(Number(id), observaciones);
  }
}