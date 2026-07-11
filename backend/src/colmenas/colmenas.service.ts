import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CrearColmenaDto } from './dto/crear-colmena.dto';
import { ActualizarColmenaDto } from './dto/actualizar-colmena.dto';

@Injectable()
export class ColmenasService {
  constructor(private readonly dataSource: DataSource) {}

  async obtenerTodas() {
    const query = `
      SELECT 
        c.id,
        c.apiario_id,
        a.nombre AS apiario,
        c.identificador,
        ec.nombre AS estado_colmena,
        tc.nombre AS tipo_colmena,
        fc.nombre AS fuerza_colonia,
        temp.nombre AS temperamento,
        c.color,
        c.activa,
        c.fecha_creacion,
        c.numero_alzas,
        c.numero_cuadros,
        c.tiene_reina,
        c.notas
      FROM colmenas c
      INNER JOIN apiarios a ON c.apiario_id = a.id
      LEFT JOIN estados_colmena ec ON c.estado_colmena_id = ec.id
      LEFT JOIN tipos_colmena tc ON c.tipo_colmena_id = tc.id
      LEFT JOIN fuerzas_colonia fc ON c.fuerza_colonia_id = fc.id
      LEFT JOIN temperamentos_colonia temp ON c.temperamento_id = temp.id
      WHERE c.activa = true
      ORDER BY c.id DESC;
    `;

    return await this.dataSource.query(query);
  }

  async obtenerPorId(id: number) {
    const query = `
      SELECT 
        c.id,
        c.apiario_id,
        a.nombre AS apiario,
        c.identificador,
        c.estado_colmena_id,
        ec.nombre AS estado_colmena,
        c.tipo_colmena_id,
        tc.nombre AS tipo_colmena,
        c.fuente_colmena_id,
        fcol.nombre AS fuente_colmena,
        c.proposito_colmena_id,
        pc.nombre AS proposito_colmena,
        c.fuerza_colonia_id,
        fc.nombre AS fuerza_colonia,
        c.temperamento_id,
        temp.nombre AS temperamento,
        c.color,
        c.activa,
        c.fecha_creacion,
        c.numero_alzas,
        c.numero_cuadros,
        c.tiene_reina,
        c.notas
      FROM colmenas c
      INNER JOIN apiarios a ON c.apiario_id = a.id
      LEFT JOIN estados_colmena ec ON c.estado_colmena_id = ec.id
      LEFT JOIN tipos_colmena tc ON c.tipo_colmena_id = tc.id
      LEFT JOIN fuentes_colmena fcol ON c.fuente_colmena_id = fcol.id
      LEFT JOIN propositos_colmena pc ON c.proposito_colmena_id = pc.id
      LEFT JOIN fuerzas_colonia fc ON c.fuerza_colonia_id = fc.id
      LEFT JOIN temperamentos_colonia temp ON c.temperamento_id = temp.id
      WHERE c.id = $1
      LIMIT 1;
    `;

    const resultado = await this.dataSource.query(query, [id]);

    if (resultado.length === 0) {
      throw new NotFoundException('Colmena no encontrada');
    }

    return resultado[0];
  }

  async obtenerPorApiario(apiarioId: number) {
    const query = `
      SELECT 
        c.id,
        c.apiario_id,
        a.nombre AS apiario,
        c.identificador,
        ec.nombre AS estado_colmena,
        tc.nombre AS tipo_colmena,
        fc.nombre AS fuerza_colonia,
        temp.nombre AS temperamento,
        c.color,
        c.activa,
        c.fecha_creacion,
        c.numero_alzas,
        c.numero_cuadros,
        c.tiene_reina,
        c.notas
      FROM colmenas c
      INNER JOIN apiarios a ON c.apiario_id = a.id
      LEFT JOIN estados_colmena ec ON c.estado_colmena_id = ec.id
      LEFT JOIN tipos_colmena tc ON c.tipo_colmena_id = tc.id
      LEFT JOIN fuerzas_colonia fc ON c.fuerza_colonia_id = fc.id
      LEFT JOIN temperamentos_colonia temp ON c.temperamento_id = temp.id
      WHERE c.apiario_id = $1
      AND c.activa = true
      ORDER BY c.id DESC;
    `;

    return await this.dataSource.query(query, [apiarioId]);
  }

  async crear(datos: CrearColmenaDto) {
    const query = `
      INSERT INTO colmenas (
        apiario_id,
        identificador,
        estado_colmena_id,
        tipo_colmena_id,
        fuente_colmena_id,
        proposito_colmena_id,
        fuerza_colonia_id,
        temperamento_id,
        color,
        fecha_creacion,
        numero_alzas,
        numero_cuadros,
        tiene_reina,
        notas
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `;

    const valores = [
      datos.apiario_id,
      datos.identificador,
      datos.estado_colmena_id ?? null,
      datos.tipo_colmena_id ?? null,
      datos.fuente_colmena_id ?? null,
      datos.proposito_colmena_id ?? null,
      datos.fuerza_colonia_id ?? null,
      datos.temperamento_id ?? null,
      datos.color ?? null,
      datos.fecha_creacion ?? null,
      datos.numero_alzas ?? 0,
      datos.numero_cuadros ?? 0,
      datos.tiene_reina ?? false,
      datos.notas ?? null,
    ];

    const resultado = await this.dataSource.query(query, valores);

    return {
      mensaje: 'Colmena registrada correctamente',
      colmena: resultado[0],
    };
  }

  async actualizar(id: number, datos: ActualizarColmenaDto) {
    await this.obtenerPorId(id);

    const query = `
      UPDATE colmenas
      SET
        apiario_id = COALESCE($1, apiario_id),
        identificador = COALESCE($2, identificador),
        estado_colmena_id = COALESCE($3, estado_colmena_id),
        tipo_colmena_id = COALESCE($4, tipo_colmena_id),
        fuente_colmena_id = COALESCE($5, fuente_colmena_id),
        proposito_colmena_id = COALESCE($6, proposito_colmena_id),
        fuerza_colonia_id = COALESCE($7, fuerza_colonia_id),
        temperamento_id = COALESCE($8, temperamento_id),
        color = COALESCE($9, color),
        fecha_creacion = COALESCE($10, fecha_creacion),
        numero_alzas = COALESCE($11, numero_alzas),
        numero_cuadros = COALESCE($12, numero_cuadros),
        tiene_reina = COALESCE($13, tiene_reina),
        notas = COALESCE($14, notas)
      WHERE id = $15
      RETURNING *;
    `;

    const valores = [
      datos.apiario_id ?? null,
      datos.identificador ?? null,
      datos.estado_colmena_id ?? null,
      datos.tipo_colmena_id ?? null,
      datos.fuente_colmena_id ?? null,
      datos.proposito_colmena_id ?? null,
      datos.fuerza_colonia_id ?? null,
      datos.temperamento_id ?? null,
      datos.color ?? null,
      datos.fecha_creacion ?? null,
      datos.numero_alzas ?? null,
      datos.numero_cuadros ?? null,
      datos.tiene_reina ?? null,
      datos.notas ?? null,
      id,
    ];

    const resultado = await this.dataSource.query(query, valores);

    return {
      mensaje: 'Colmena actualizada correctamente',
      colmena: resultado[0],
    };
  }

  async desactivar(id: number) {
    await this.obtenerPorId(id);

    const query = `
      UPDATE colmenas
      SET activa = false
      WHERE id = $1
      RETURNING *;
    `;

    const resultado = await this.dataSource.query(query, [id]);

    return {
      mensaje: 'Colmena desactivada correctamente',
      colmena: resultado[0],
    };
  }
}