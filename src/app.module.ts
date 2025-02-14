import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ScreensModule } from './screens/screens.module';
import { AdsUploadModule } from './adsUpload/adsUpload.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    DatabaseModule, ScreensModule, AdsUploadModule, UsersModule, AuthModule, AnnouncementsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
