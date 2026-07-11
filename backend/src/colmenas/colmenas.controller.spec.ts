import { Test, TestingModule } from '@nestjs/testing';
import { ColmenasController } from './colmenas.controller';

describe('ColmenasController', () => {
  let controller: ColmenasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColmenasController],
    }).compile();

    controller = module.get<ColmenasController>(ColmenasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
