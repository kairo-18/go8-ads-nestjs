import { Module } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from './entities/screen.entity';
import { Ads } from './entities/ads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Screen, Ads])],
  controllers: [ScreensController],
  providers: [ScreensService],
})
export class ScreensModule {}
