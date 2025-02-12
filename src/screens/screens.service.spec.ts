import { Test, TestingModule } from '@nestjs/testing';
import { ScreensService } from './screens.service';

describe('ScreensService', () => {
  let service: ScreensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreensService],
    }).compile();

    service = module.get<ScreensService>(ScreensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
