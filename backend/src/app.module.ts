import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiariosModule } from './apiarios/apiarios.module';
import { CatalogosModule } from './catalogos/catalogos.module';
import { ColmenasModule } from './colmenas/colmenas.module';
import { DispositivosModule } from './dispositivos/dispositivos.module';
import { IotModule } from './iot/iot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),

    ApiariosModule,

    CatalogosModule,

    ColmenasModule,

    DispositivosModule,

    IotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}