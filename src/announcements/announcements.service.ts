import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './entities/announcement.entity';
import { Screen } from 'src/screens/entities/screen.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementsGateway } from './announcements.gateway'; // Import the WebSocket Gateway

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,

    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>,

    private readonly announcementsGateway: AnnouncementsGateway, // Inject the WebSocket Gateway
  ) {}

  async create(dto: CreateAnnouncementDto): Promise<Announcement> {
    const { title, message, flightNumber, gate, duration, screenIds } = dto;

    // Fetch screens based on IDs
    const screens = await this.screenRepository.findByIds(screenIds ?? []);

    // Create announcement
    const announcement = this.announcementRepository.create({
      title,
      message,
      flightNumber,
      gate,
      duration,
      screens,
      active: true,
    });

    const savedAnnouncement = await this.announcementRepository.save(announcement);

    // Emit the announcement to the selected screens
    this.announcementsGateway.broadcastAnnouncementToScreens(announcement, screenIds || []);

    return savedAnnouncement;
  }

  async findAll(): Promise<Announcement[]> {
    return await this.announcementRepository.find({
      where: { active: true },
      relations: ['screens'], 
    });
  }

  async findActive(): Promise<Announcement[]> {
    return this.announcementRepository.find({
      where: { active: true },
      relations: ['screens'],
    });
  }

  async findOne(id: number): Promise<Announcement | null> {
    return await this.announcementRepository.findOne({
      where: { id },
      relations: ['screens'], 
    });
  }

  async update(id: number, dto: UpdateAnnouncementDto): Promise<Announcement> {
    const existingAnnouncement = await this.findOne(id);
    if (!existingAnnouncement) {
      throw new NotFoundException(`Announcement with ID ${id} not found.`);
    }

    if (dto.screenIds) {
      existingAnnouncement.screens = await this.screenRepository.findByIds(dto.screenIds);
    }

    await this.announcementRepository.save({ ...existingAnnouncement, ...dto });

    // Emit the updated announcement to the relevant screens
    this.announcementsGateway.broadcastAnnouncementToScreens(existingAnnouncement, dto.screenIds || []);

    return (await this.findOne(id)) as Announcement;
  }
  async markAsInactive(id: number): Promise<void> {
    await this.announcementRepository.update(id, { active: false });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.announcementRepository.delete(id);

    if (!result.affected || result.affected === 0) {
      throw new NotFoundException(`Announcement with ID ${id} not found.`);
    }

    return true;
  }
}
