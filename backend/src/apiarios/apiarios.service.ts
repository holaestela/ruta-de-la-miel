import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CrearApiarioDto } from './dto/crear-apiario.dto';
import { ActualizarApiarioDto } from './dto/actualizar-apiario.dto';

@Injectable()
export class ApiariosService {
  constructor(private readonly dataSource: DataSource) {}

  async obtenerTodos() {
    const query = `
      SELECT 
        a.id,
        a.nombre,
        ta.nombre AS tipo_apiario,
        es.nombre AS exposicion_solar,
        a.descripcion,
        a.direccion,
        a.codigo_postal,
        a.ciudad,
        a.provincia,
        p.nombre AS pais,
        a.latitud,
        a.longitud,
        a.activo,
        a.fecha_registro
      FROM apiarios a
      LEFT JOIN tipos_apiario ta ON a.tipo_apiario_id = ta.id
      LEFT JOIN exposiciones_solares es ON a.exposicion_solar_id = es.id
      LEFT JOIN paises p ON a.pais_id = p.id
      WHERE a.activo = true
      ORDER BY a.id DESC;
    `;

    return await this.dataSource.query(query);
  }

  async obtenerPorId(id: number) {
    const query = `
      SELECT 
        a.id,
        a.nombre,
        a.tipo_apiario_id,
        ta.nombre AS tipo_apiario,
        a.exposicion_solar_id,
        es.nombre AS exposicion_solar,
        a.descripcion,
        a.direccion,
        a.codigo_postal,
        a.ciudad,
        a.provincia,
        a.pais_id,
        p.nombre AS pais,
        a.latitud,
        a.longitud,
        a.activo,
        a.fecha_registro
      FROM apiarios a
      LEFT JOIN tipos_apiario ta ON a.tipo_apiario_id = ta.id
      LEFT JOIN exposiciones_solares es ON a.exposicion_solar_id = es.id
      LEFT JOIN paises p ON a.pais_id = p.id
      WHERE a.id = $1
      LIMIT 1;
    `;

    const resultado = await this.dataSource.query(query, [id]);

    if (resultado.length === 0) {
      throw new NotFoundException('Apiario no encontrado');
    }

    return resultado[0];
  }

  async crear(datos: CrearApiarioDto) {
    const query = `
      INSERT INTO apiarios (
        nombre,
        tipo_apiario_id,
        exposicion_solar_id,
        descripcion,
        direccion,
        codigo_postal,
        ciudad,
        provincia,
        pais_id,
        latitud,
        longitud
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

    const valores = [
      datos.nombre,
      datos.tipo_apiario_id ?? null,
      datos.exposicion_solar_id ?? null,
      datos.descripcion ?? null,
      datos.direccion ?? null,
      datos.codigo_postal ?? null,
      datos.ciudad ?? null,
      datos.provincia ?? null,
      datos.pais_id ?? null,
      datos.latitud ?? null,
      datos.longitud ?? null,
    ];

    const resultado = await this.dataSource.query(query, valores);

    return {
      mensaje: 'Apiario registrado correctamente',
      apiario: resultado[0],
    };
  }

  async actualizar(id: number, datos: ActualizarApiarioDto) {
    await this.obtenerPorId(id);

    const query = `
      UPDATE apiarios
      SET
        nombre = COALESCE($1, nombre),
        tipo_apiario_id = COALESCE($2, tipo_apiario_id),
        exposicion_solar_id = COALESCE($3, exposicion_solar_id),
        descripcion = COALESCE($4, descripcion),
        direccion = COALESCE($5, direccion),
        codigo_postal = COALESCE($6, codigo_postal),
        ciudad = COALESCE($7, ciudad),
        provincia = COALESCE($8, provincia),
        pais_id = COALESCE($9, pais_id),
        latitud = COALESCE($10, latitud),
        longitud = COALESCE($11, longitud)
      WHERE id = $12
      RETURNING *;
    `;

    const valores = [
      datos.nombre ?? null,
      datos.tipo_apiario_id ?? null,
      datos.exposicion_solar_id ?? null,
      datos.descripcion ?? null,
      datos.direccion ?? null,
      datos.codigo_postal ?? null,
      datos.ciudad ?? null,
      datos.provincia ?? null,
      datos.pais_id ?? null,
      datos.latitud ?? null,
      datos.longitud ?? null,
      id,
    ];

    const resultado = await this.dataSource.query(query, valores);

    return {
      mensaje: 'Apiario actualizado correctamente',
      apiario: resultado[0],
    };
  }

  async desactivar(id: number) {
    await this.obtenerPorId(id);

    const query = `
      UPDATE apiarios
      SET activo = false
      WHERE id = $1
      RETURNING *;
    `;

    const resultado = await this.dataSource.query(query, [id]);

    return {
      mensaje: 'Apiario desactivado correctamente',
      apiario: resultado[0],
    };
  }
}