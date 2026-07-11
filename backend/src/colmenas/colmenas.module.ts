import { Module } from '@nestjs/common';
import { ColmenasService } from './colmenas.service';
import { ColmenasController } from './colmenas.controller';

@Module({
  controllers: [ColmenasController],
  providers: [ColmenasService],
})
export class ColmenasModule {}