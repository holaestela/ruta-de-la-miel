import { Test, TestingModule } from '@nestjs/testing';
import { ApiariosService } from './apiarios.service';

describe('ApiariosService', () => {
  let service: ApiariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiariosService],
    }).compile();

    service = module.get<ApiariosService>(ApiariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
