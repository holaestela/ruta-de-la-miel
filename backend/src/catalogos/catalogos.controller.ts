import { Controller, Get, Param } from '@nestjs/common';
import { CatalogosService } from './catalogos.service';

@Controller('api/catalogos')
export class CatalogosController {
  constructor(private readonly catalogosService: CatalogosService) {}

  @Get()
  obtenerListaCatalogos() {
    return this.catalogosService.obtenerListaCatalogos();
  }

  @Get(':nombreCatalogo')
  obtenerCatalogo(@Param('nombreCatalogo') nombreCatalogo: string) {
    return this.catalogosService.obtenerCatalogo(nombreCatalogo);
  }
}