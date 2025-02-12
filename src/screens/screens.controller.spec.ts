import { Test, TestingModule } from '@nestjs/testing';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';

describe('ScreensController', () => {
  let controller: ScreensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreensController],
      providers: [ScreensService],
    }).compile();

    controller = module.get<ScreensController>(ScreensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
