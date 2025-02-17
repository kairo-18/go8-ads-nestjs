import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { Announcement } from './entities/announcement.entity';
import { Screen } from 'src/screens/entities/screen.entity';
import { AnnouncementsGateway } from './announcements.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement, Screen])],
  controllers: [AnnouncementsController],
  providers: [
    AnnouncementsService,
    {
      provide: AnnouncementsGateway,
      useClass: AnnouncementsGateway,
    },
  ],
})
export class AnnouncementsModule {}
