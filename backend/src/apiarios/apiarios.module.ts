import { Module } from '@nestjs/common';
import { ApiariosService } from './apiarios.service';
import { ApiariosController } from './apiarios.controller';

@Module({
  providers: [ApiariosService],
  controllers: [ApiariosController]
})
export class ApiariosModule {}
