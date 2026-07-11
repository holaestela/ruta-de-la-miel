import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CatalogosService {
  constructor(private readonly dataSource: DataSource) {}

  private readonly catalogosPermitidos: Record<string, string> = {
    roles: 'roles',
    tipos_apiario: 'tipos_apiario',
    exposiciones_solares: 'exposiciones_solares',
    paises: 'paises',

    estados_colmena: 'estados_colmena',
    tipos_colmena: 'tipos_colmena',
    fuentes_colmena: 'fuentes_colmena',
    propositos_colmena: 'propositos_colmena',
    fuerzas_colonia: 'fuerzas_colonia',
    temperamentos_colonia: 'temperamentos_colonia',

    estados_reina: 'estados_reina',
    razas_reina: 'razas_reina',
    fuentes_reina: 'fuentes_reina',

    categorias_tarea: 'categorias_tarea',
    prioridades_tarea: 'prioridades_tarea',
    estados_tarea: 'estados_tarea',

    tipos_alimento: 'tipos_alimento',
    clasificaciones_alimento: 'clasificaciones_alimento',
    proporciones_alimento: 'proporciones_alimento',
    unidades_medida: 'unidades_medida',

    productos_apicolas: 'productos_apicolas',
    variedades_producto: 'variedades_producto',

    enfermedades_plagas: 'enfermedades_plagas',
    tratamientos: 'tratamientos',
    unidades_dosis: 'unidades_dosis',
    estados_tratamiento: 'estados_tratamiento',
    resultados_tratamiento: 'resultados_tratamiento',

    categorias_financieras: 'categorias_financieras',

    tipos_dispositivo: 'tipos_dispositivo',
    estados_dispositivo: 'estados_dispositivo',

    tipos_alerta: 'tipos_alerta',
    estados_alerta: 'estados_alerta',
    estados_salud_colmena: 'estados_salud_colmena',

    fuentes_nectar: 'fuentes_nectar',
  };

  obtenerListaCatalogos() {
    return {
      mensaje: 'Catálogos disponibles',
      catalogos: Object.keys(this.catalogosPermitidos),
    };
  }

  async obtenerCatalogo(nombreCatalogo: string) {
    const tabla = this.catalogosPermitidos[nombreCatalogo];

    if (!tabla) {
      throw new BadRequestException('Catálogo no permitido o no existe');
    }

    const query = `
      SELECT *
      FROM ${tabla}
      WHERE activo = true
      ORDER BY id ASC;
    `;

    return await this.dataSource.query(query);
  }
}