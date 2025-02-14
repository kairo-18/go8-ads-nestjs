import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './entities/announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';


@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
  ) {}

  async create(dto: CreateAnnouncementDto): Promise<Announcement> {
    const announcement = this.announcementRepository.create(dto);
    return await this.announcementRepository.save(announcement);
  }

  async findAll(): Promise<Announcement[]> {
    return await this.announcementRepository.find({ where: { active: true } });
  }
  
  async markAsInactive(id: number): Promise<void> {
    await this.announcementRepository.update(id, { active: false });
  }
  async findActive(): Promise<Announcement[]> {
    return this.announcementRepository.find({ where: { active: true } });
  }
  
  

  async findOne(id: number): Promise<Announcement | null> {
    return await this.announcementRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateAnnouncementDto): Promise<Announcement> {
    const existingAnnouncement = await this.findOne(id);
    if (!existingAnnouncement) {
      throw new NotFoundException(`Announcement with ID ${id} not found.`);
    }
  
    await this.announcementRepository.update(id, dto);
    return (await this.findOne(id)) as Announcement; // Ensure it's not null
  }
  
  

  async remove(id: number): Promise<boolean> {
    const result = await this.announcementRepository.delete(id);
    
    if (!result.affected || result.affected === 0) {
      throw new NotFoundException(`Announcement with ID ${id} not found.`);
    }
    
    return true;
  }
  
}
