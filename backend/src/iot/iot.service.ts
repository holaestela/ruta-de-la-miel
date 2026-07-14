import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CrearLecturaIotDto } from './dto/crear-lectura-iot.dto';

@Injectable()
export class IotService {
  constructor(private readonly dataSource: DataSource) {}

  async insertarLectura(datos: CrearLecturaIotDto) {
    try {
        //cabi de query por el de la funcion avanzada 
 const query = `
  SELECT public.fn_insertar_lectura_iot_avanzada(
    $1::varchar,
    CURRENT_TIMESTAMP::timestamp,
    $2::numeric,
    $3::numeric,
    $4::numeric,
    $5::numeric,
    $6::numeric,
    $7::varchar,
    $8::varchar,
    $9::varchar,
    $10::text,
    TRUE::boolean
  ) AS lectura_id;
`;
// e agregaron nuevos valores para estos campos añadodos 
     const valores = [
  datos.device_uid,
  datos.temperatura ?? null,
  datos.humedad ?? null,
  datos.peso ?? null,
  datos.bateria ?? null,
  datos.senal ?? null,
  datos.origen_comunicacion ?? 'wifi',
  datos.gateway_uid ?? null,
  datos.lote_sincronizacion ?? null,
  datos.observaciones ?? null,
];

      const resultado = await this.dataSource.query(query, valores);

      return {
        mensaje: 'Lectura IoT registrada correctamente',
        lectura_id: resultado[0].lectura_id,
      };
    } catch (error: any) {
      if (error.code === '42883') {
        throw new BadRequestException(
          'No existe la función fn_insertar_lectura_iot() en PostgreSQL',
        );
      }

      throw new BadRequestException({
        mensaje: 'Error al registrar lectura IoT',
        detalle: error.message,
      });
    }
  }

  async obtenerLecturas() {
    const query = `
      SELECT 
        li.id,
        d.device_uid,
        a.nombre AS apiario,
        c.identificador AS colmena,
        li.fecha_hora,
        li.temperatura_interna,
        li.humedad_relativa,
        li.peso,
        li.bateria,
        li.senal,
        li.creado_en
      FROM lecturas_iot li
      INNER JOIN dispositivos d ON li.dispositivo_id = d.id
      INNER JOIN apiarios a ON li.apiario_id = a.id
      INNER JOIN colmenas c ON li.colmena_id = c.id
      ORDER BY li.fecha_hora DESC
      LIMIT 100;
    `;

    return await this.dataSource.query(query);
  }

  async obtenerLecturasPorColmena(colmenaId: number) {
    const query = `
      SELECT 
        li.id,
        d.device_uid,
        a.nombre AS apiario,
        c.identificador AS colmena,
        li.fecha_hora,
        li.temperatura_interna,
        li.humedad_relativa,
        li.peso,
        li.bateria,
        li.senal
      FROM lecturas_iot li
      INNER JOIN dispositivos d ON li.dispositivo_id = d.id
      INNER JOIN apiarios a ON li.apiario_id = a.id
      INNER JOIN colmenas c ON li.colmena_id = c.id
      WHERE li.colmena_id = $1
      ORDER BY li.fecha_hora DESC
      LIMIT 100;
    `;

    return await this.dataSource.query(query, [colmenaId]);
  }

  async obtenerLecturasPorDispositivo(deviceUid: string) {
    const query = `
      SELECT 
        li.id,
        d.device_uid,
        a.nombre AS apiario,
        c.identificador AS colmena,
        li.fecha_hora,
        li.temperatura_interna,
        li.humedad_relativa,
        li.peso,
        li.bateria,
        li.senal
      FROM lecturas_iot li
      INNER JOIN dispositivos d ON li.dispositivo_id = d.id
      INNER JOIN apiarios a ON li.apiario_id = a.id
      INNER JOIN colmenas c ON li.colmena_id = c.id
      WHERE d.device_uid = $1
      ORDER BY li.fecha_hora DESC
      LIMIT 100;
    `;

    return await this.dataSource.query(query, [deviceUid]);
  }
}