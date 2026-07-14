import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CrearDispositivoDto } from './dto/crear-dispositivo.dto';
import { ActualizarDispositivoDto } from './dto/actualizar-dispositivo.dto';

@Injectable()
export class DispositivosService {
  constructor(private readonly dataSource: DataSource) {}

  async obtenerTodos() {
    const query = `
      SELECT
        d.id,
        d.device_uid,
        d.apiario_id,
        a.nombre AS apiario,
        d.colmena_id,
        c.identificador AS colmena,
        td.nombre AS tipo_dispositivo,
        ed.nombre AS estado_dispositivo,
        d.fecha_instalacion,
        d.ultima_lectura,
        d.firmware_version,
        d.notas,
        d.activo
      FROM dispositivos d
      INNER JOIN apiarios a ON d.apiario_id = a.id
      LEFT JOIN colmenas c ON d.colmena_id = c.id
      LEFT JOIN tipos_dispositivo td ON d.tipo_dispositivo_id = td.id
      LEFT JOIN estados_dispositivo ed ON d.estado_dispositivo_id = ed.id
      WHERE d.activo = true
      ORDER BY d.id DESC;
    `;

    return await this.dataSource.query(query);
  }

  async obtenerPorId(id: number) {
    const query = `
      SELECT
        d.id,
        d.device_uid,
        d.apiario_id,
        a.nombre AS apiario,
        d.colmena_id,
        c.identificador AS colmena,
        d.tipo_dispositivo_id,
        td.nombre AS tipo_dispositivo,
        d.estado_dispositivo_id,
        ed.nombre AS estado_dispositivo,
        d.fecha_instalacion,
        d.ultima_lectura,
        d.firmware_version,
        d.api_key,
        d.notas,
        d.activo
      FROM dispositivos d
      INNER JOIN apiarios a ON d.apiario_id = a.id
      LEFT JOIN colmenas c ON d.colmena_id = c.id
      LEFT JOIN tipos_dispositivo td ON d.tipo_dispositivo_id = td.id
      LEFT JOIN estados_dispositivo ed ON d.estado_dispositivo_id = ed.id
      WHERE d.id = $1
      LIMIT 1;
    `;

    const resultado = await this.dataSource.query(query, [id]);

    if (resultado.length === 0) {
      throw new NotFoundException('Dispositivo no encontrado');
    }

    return resultado[0];
  }

  async obtenerPorColmena(colmenaId: number) {
    const query = `
      SELECT
        d.id,
        d.device_uid,
        d.apiario_id,
        a.nombre AS apiario,
        d.colmena_id,
        c.identificador AS colmena,
        td.nombre AS tipo_dispositivo,
        ed.nombre AS estado_dispositivo,
        d.fecha_instalacion,
        d.ultima_lectura,
        d.firmware_version,
        d.notas,
        d.activo
      FROM dispositivos d
      INNER JOIN apiarios a ON d.apiario_id = a.id
      LEFT JOIN colmenas c ON d.colmena_id = c.id
      LEFT JOIN tipos_dispositivo td ON d.tipo_dispositivo_id = td.id
      LEFT JOIN estados_dispositivo ed ON d.estado_dispositivo_id = ed.id
      WHERE d.colmena_id = $1
      AND d.activo = true
      ORDER BY d.id DESC;
    `;

    return await this.dataSource.query(query, [colmenaId]);
  }

  async crear(datos: CrearDispositivoDto) {
    try {
      const query = `
        INSERT INTO dispositivos (
          device_uid,
          apiario_id,
          colmena_id,
          tipo_dispositivo_id,
          estado_dispositivo_id,
          fecha_instalacion,
          firmware_version,
          api_key,
          notas
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `;

      const valores = [
        datos.device_uid,
        datos.apiario_id,
        datos.colmena_id ?? null,
        datos.tipo_dispositivo_id ?? null,
        datos.estado_dispositivo_id ?? null,
        datos.fecha_instalacion ?? null,
        datos.firmware_version ?? null,
        datos.api_key ?? null,
        datos.notas ?? null,
      ];

      const resultado = await this.dataSource.query(query, valores);

      return {
        mensaje: 'Dispositivo registrado correctamente',
        dispositivo: resultado[0],
      };
    } catch (error: any) {
      if (error.code === '23505') {
        throw new BadRequestException('El device_uid ya está registrado');
      }

      if (error.code === '23503') {
        throw new BadRequestException(
          'El apiario, colmena, tipo o estado del dispositivo no existe',
        );
      }

      throw error;
    }
  }

  async actualizar(id: number, datos: ActualizarDispositivoDto) {
    await this.obtenerPorId(id);

    try {
      const query = `
        UPDATE dispositivos
        SET
          device_uid = COALESCE($1, device_uid),
          apiario_id = COALESCE($2, apiario_id),
          colmena_id = COALESCE($3, colmena_id),
          tipo_dispositivo_id = COALESCE($4, tipo_dispositivo_id),
          estado_dispositivo_id = COALESCE($5, estado_dispositivo_id),
          fecha_instalacion = COALESCE($6, fecha_instalacion),
          firmware_version = COALESCE($7, firmware_version),
          api_key = COALESCE($8, api_key),
          notas = COALESCE($9, notas)
        WHERE id = $10
        RETURNING *;
      `;

      const valores = [
        datos.device_uid ?? null,
        datos.apiario_id ?? null,
        datos.colmena_id ?? null,
        datos.tipo_dispositivo_id ?? null,
        datos.estado_dispositivo_id ?? null,
        datos.fecha_instalacion ?? null,
        datos.firmware_version ?? null,
        datos.api_key ?? null,
        datos.notas ?? null,
        id,
      ];

      const resultado = await this.dataSource.query(query, valores);

      return {
        mensaje: 'Dispositivo actualizado correctamente',
        dispositivo: resultado[0],
      };
    } catch (error: any) {
      if (error.code === '23505') {
        throw new BadRequestException('El device_uid ya está registrado');
      }

      if (error.code === '23503') {
        throw new BadRequestException(
          'El apiario, colmena, tipo o estado del dispositivo no existe',
        );
      }

      throw error;
    }
  }

  async desactivar(id: number) {
    await this.obtenerPorId(id);

    const query = `
      UPDATE dispositivos
      SET activo = false
      WHERE id = $1
      RETURNING *;
    `;

    const resultado = await this.dataSource.query(query, [id]);

    return {
      mensaje: 'Dispositivo desactivado correctamente',
      dispositivo: resultado[0],
    };
  }
}