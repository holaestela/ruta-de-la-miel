import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IotService } from './iot.service';
import { CrearLecturaIotDto } from './dto/crear-lectura-iot.dto';

@Controller('api/iot')
export class IotController {
  constructor(private readonly iotService: IotService) {}

  @Post('lecturas')
  insertarLectura(@Body() datos: CrearLecturaIotDto) {
    return this.iotService.insertarLectura(datos);
  }

  @Get('lecturas')
  obtenerLecturas() {
    return this.iotService.obtenerLecturas();
  }

  @Get('lecturas/colmena/:colmenaId')
  obtenerLecturasPorColmena(@Param('colmenaId') colmenaId: string) {
    return this.iotService.obtenerLecturasPorColmena(Number(colmenaId));
  }

  @Get('lecturas/dispositivo/:deviceUid')
  obtenerLecturasPorDispositivo(@Param('deviceUid') deviceUid: string) {
    return this.iotService.obtenerLecturasPorDispositivo(deviceUid);
  }
}