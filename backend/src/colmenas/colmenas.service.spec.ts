import { Test, TestingModule } from '@nestjs/testing';
import { ColmenasService } from './colmenas.service';

describe('ColmenasService', () => {
  let service: ColmenasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColmenasService],
    }).compile();

    service = module.get<ColmenasService>(ColmenasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
