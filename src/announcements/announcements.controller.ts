import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  async create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @Get()
  async findActive() {
    return this.announcementsService.findActive();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    return this.announcementsService.update(+id, updateAnnouncementDto);
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    return this.announcementsService.markAsInactive(+id);
  }
  

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.announcementsService.remove(+id);
  }
}
