import { Injectable } from '@nestjs/common';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { EntityManager, Repository } from 'typeorm';
import { Screen } from './entities/screen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ads } from './entities/ads.entity';

@Injectable()
export class ScreensService {

  constructor(
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>,
    private readonly entityManager: EntityManager
  ){}

  create(createScreenDto: CreateScreenDto) {
    const ads = createScreenDto.ads.map(
      (createAdsDto) => new Ads(createAdsDto)
    );

    const screen = new Screen({
      ...createScreenDto,
      ads,
  });
    this.entityManager.save(screen);
    return 'This action adds a new screen';
  }

  async findAll() {
    const screens = await this.screenRepository.find({ relations: {ads: true} });
    return screens;
  }

  findOne(id: number) {
    return this.screenRepository.findOne({
      where: { id },
      relations: { ads: true },
    });
  }

  async update(id: number, updateScreenDto: UpdateScreenDto) {
    const screen = await this.screenRepository.findOneBy({id});
    if (screen) {
      screen.name = updateScreenDto.name;
      screen.routeName = updateScreenDto.routeName;

      const ads = updateScreenDto.ads.map(
        (createAdsDto) => new Ads(createAdsDto)
      );

      screen.ads = ads;
      await this.entityManager.save(screen);
    }else{
      return 'Screen not found';
    }
  }

  remove(id: number) {
    this.entityManager.delete(Screen, id);
  }
}
