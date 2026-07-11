import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-test')
  async testDatabase() {
    const conexion = await this.dataSource.query(`
      SELECT 
        current_database() AS base_datos,
        current_user AS usuario
    `);

    const tablas = await this.dataSource.query(`
      SELECT COUNT(*)::int AS total_tablas
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    `);

    return {
      mensaje: 'Conexión a PostgreSQL exitosa',
      base_datos: conexion[0].base_datos,
      usuario: conexion[0].usuario,
      total_tablas: tablas[0].total_tablas,
    };
  }
}