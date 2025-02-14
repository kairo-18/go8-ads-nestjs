import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { EntityManager, Repository } from 'typeorm';
import { Screen } from './entities/screen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ads } from './entities/ads.entity';
import { CreateAdsDto } from './dto/create-ads.dto';
import { UpdateAdsDto } from './dto/update-ads-dto';

@Injectable()
export class ScreensService {
  constructor(
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>,
    @InjectRepository(Ads)
    private readonly adsRepository: Repository<Ads>,

    private readonly entityManager: EntityManager,
  ) {}

  create(createScreenDto: CreateScreenDto) {
    const ads = createScreenDto.ads.map(
      (createAdsDto) => new Ads(createAdsDto),
    );

    const screen = new Screen({
      ...createScreenDto,
      ads,
    });
    this.entityManager.save(screen);
    return 'This action adds a new screen';
  }

  async findAll() {
    const screens = await this.screenRepository.find({
      relations: { ads: true },
    });
    return screens;
  }

  findOne(id: number) {
    return this.screenRepository.findOne({
      where: { id },
      relations: { ads: true },
    });
  }

  async update(id: number, updateScreenDto: UpdateScreenDto) {
    const screen = await this.screenRepository.findOneBy({ id });
    if (screen) {
      screen.name = updateScreenDto.name;
      screen.routeName = updateScreenDto.routeName;
      screen.layoutType = updateScreenDto.layoutType;

      const ads = updateScreenDto.ads.map(
        (createAdsDto) => new Ads(createAdsDto),
      );

      screen.ads = ads;
      await this.entityManager.save(screen);
    } else {
      return 'Screen not found';
    }
  }

  remove(id: number) {
    this.entityManager.delete(Screen, id);
  }

  async addAdToScreen(screenId: number, adDto: CreateAdsDto) {
    const screen = await this.screenRepository.findOne({
      where: { id: screenId },
      relations: { ads: true },
    });

    if (!screen) {
      return 'Screen not found';
    }

    // Create a new Ad or fetch existing one if needed
    const newAd = new Ads(adDto);
    await this.entityManager.save(newAd);

    // Append the new Ad instead of replacing
    screen.ads.push(newAd);

    // Save the updated screen
    await this.entityManager.save(screen);

    return screen;
  }

  async updateAd(screenId: number, adId: number, updateAdDto: UpdateAdsDto) {
    const screen = await this.screenRepository.findOne({
      where: { id: screenId },
      relations: { ads: true },
    });

    if (!screen) {
      throw new NotFoundException('Screen not found');
    }

    const ad = await this.adsRepository.findOne({ where: { id: adId } });

    if (!ad) {
      throw new NotFoundException('Ad not found');
    }

    Object.assign(ad, updateAdDto);
    await this.adsRepository.save(ad);

    return {
      message: 'Ad updated successfully',
      ad,
    };
  }

  //Remove Ad
  async removeAd(screenId: number, adId: number) {
    const screen = await this.screenRepository.findOne({
      where: { id: screenId },
      relations: { ads: true },
    });

    if (!screen) {
      throw new NotFoundException('Screen not found');
    }

    const ad = await this.adsRepository.findOne({ where: { id: adId } });

    if (!ad) {
      throw new NotFoundException('Ad not found');
    }
    // Remove the Ad from the screen
    screen.ads = screen.ads.filter((a) => a.id !== ad.id);

    // Save the updated screen
    await this.entityManager.save(screen);
    await this.entityManager.delete(Ads, ad.id);

    return {
      message: 'Ad removed successfully',
      screen,
    };
  }

  
}
