import { Module } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from './entities/screen.entity';
import { Ads } from './entities/ads.entity';
import { AdsCleanupService } from './ads-cleanup.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Screen, Ads]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ScreensController],
  providers: [ScreensService, AdsCleanupService],
})
export class ScreensModule {}
