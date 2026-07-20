import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AlertasService {
  constructor(private readonly dataSource: DataSource) {}

  async obtenerTodas() {
    const query = `
      SELECT
        al.*,
        a.nombre AS apiario,
        c.identificador AS colmena,
        ta.nombre AS tipo_alerta,
        ea.nombre AS estado_alerta
      FROM alertas al
      LEFT JOIN apiarios a ON al.apiario_id = a.id
      LEFT JOIN colmenas c ON al.colmena_id = c.id
      LEFT JOIN tipos_alerta ta ON al.tipo_alerta_id = ta.id
      LEFT JOIN estados_alerta ea ON al.estado_alerta_id = ea.id
      ORDER BY al.id DESC
      LIMIT 100;
    `;

    return await this.dataSource.query(query);
  }

  async obtenerPendientes() {
    const query = `
      SELECT
        al.*,
        a.nombre AS apiario,
        c.identificador AS colmena,
        ta.nombre AS tipo_alerta,
        ea.nombre AS estado_alerta
      FROM alertas al
      LEFT JOIN apiarios a ON al.apiario_id = a.id
      LEFT JOIN colmenas c ON al.colmena_id = c.id
      LEFT JOIN tipos_alerta ta ON al.tipo_alerta_id = ta.id
      LEFT JOIN estados_alerta ea ON al.estado_alerta_id = ea.id
      WHERE LOWER(ea.nombre) IN ('pendiente', 'activa', 'nuevo', 'sin atender')
      ORDER BY al.id DESC;
    `;

    return await this.dataSource.query(query);
  }

  async obtenerAtendidas() {
    const query = `
      SELECT
        al.*,
        a.nombre AS apiario,
        c.identificador AS colmena,
        ta.nombre AS tipo_alerta,
        ea.nombre AS estado_alerta
      FROM alertas al
      LEFT JOIN apiarios a ON al.apiario_id = a.id
      LEFT JOIN colmenas c ON al.colmena_id = c.id
      LEFT JOIN tipos_alerta ta ON al.tipo_alerta_id = ta.id
      LEFT JOIN estados_alerta ea ON al.estado_alerta_id = ea.id
      WHERE LOWER(ea.nombre) IN ('atendida', 'resuelta', 'cerrada')
      ORDER BY al.id DESC;
    `;

    return await this.dataSource.query(query);
  }

  async obtenerPorColmena(colmenaId: number) {
    const query = `
      SELECT
        al.*,
        a.nombre AS apiario,
        c.identificador AS colmena,
        ta.nombre AS tipo_alerta,
        ea.nombre AS estado_alerta
      FROM alertas al
      LEFT JOIN apiarios a ON al.apiario_id = a.id
      LEFT JOIN colmenas c ON al.colmena_id = c.id
      LEFT JOIN tipos_alerta ta ON al.tipo_alerta_id = ta.id
      LEFT JOIN estados_alerta ea ON al.estado_alerta_id = ea.id
      WHERE al.colmena_id = $1
      ORDER BY al.id DESC;
    `;

    return await this.dataSource.query(query, [colmenaId]);
  }

  async obtenerPorApiario(apiarioId: number) {
    const query = `
      SELECT
        al.*,
        a.nombre AS apiario,
        c.identificador AS colmena,
        ta.nombre AS tipo_alerta,
        ea.nombre AS estado_alerta
      FROM alertas al
      LEFT JOIN apiarios a ON al.apiario_id = a.id
      LEFT JOIN colmenas c ON al.colmena_id = c.id
      LEFT JOIN tipos_alerta ta ON al.tipo_alerta_id = ta.id
      LEFT JOIN estados_alerta ea ON al.estado_alerta_id = ea.id
      WHERE al.apiario_id = $1
      ORDER BY al.id DESC;
    `;

    return await this.dataSource.query(query, [apiarioId]);
  }

  async marcarComoAtendida(id: number, observaciones?: string) {
    const existe = await this.dataSource.query(
      `
      SELECT id
      FROM alertas
      WHERE id = $1
      LIMIT 1;
      `,
      [id],
    );

    if (existe.length === 0) {
      throw new NotFoundException('Alerta no encontrada');
    }

    const estadoAtendida = await this.dataSource.query(`
      SELECT id
      FROM estados_alerta
      WHERE LOWER(nombre) IN ('atendida', 'resuelta', 'cerrada')
      ORDER BY id ASC
      LIMIT 1;
    `);

    if (estadoAtendida.length === 0) {
      throw new NotFoundException(
        'No existe un estado de alerta llamado Atendida, Resuelta o Cerrada',
      );
    }

    const query = `
  UPDATE alertas
  SET
    estado_alerta_id = $1,
    notas = COALESCE($2, notas)
  WHERE id = $3
  RETURNING *;
`;

    const resultado = await this.dataSource.query(query, [
      estadoAtendida[0].id,
      observaciones ?? null,
      id,
    ]);

    return {
      mensaje: 'Alerta marcada como atendida correctamente',
      alerta: resultado[0],
    };
  }
}