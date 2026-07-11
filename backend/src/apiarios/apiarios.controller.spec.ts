import { Test, TestingModule } from '@nestjs/testing';
import { ApiariosController } from './apiarios.controller';

describe('ApiariosController', () => {
  let controller: ApiariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiariosController],
    }).compile();

    controller = module.get<ApiariosController>(ApiariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
