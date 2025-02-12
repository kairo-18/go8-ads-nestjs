import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ScreensModule } from './screens/screens.module';
import { AdsUploadModule } from './adsUpload/adsUpload.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    DatabaseModule, ScreensModule, AdsUploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
