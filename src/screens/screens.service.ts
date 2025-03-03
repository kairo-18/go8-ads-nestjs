import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { EntityManager, Repository } from 'typeorm';
import { Screen } from './entities/screen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ads } from './entities/ads.entity';
import { CreateAdsDto } from './dto/create-ads.dto';
import { UpdateAdsDto } from './dto/update-ads-dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ScreensService {
  constructor(
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>,
    @InjectRepository(Ads)
    private readonly adsRepository: Repository<Ads>,

    private readonly entityManager: EntityManager,
  ) {}

  async create(createScreenDto: CreateScreenDto) {
    const ads = createScreenDto.ads.map(
      (createAdsDto) => new Ads(createAdsDto),
    );

    const screen = new Screen({
      ...createScreenDto,
      ads,
    });
    const savedScreen = await this.entityManager.save(screen);
    return savedScreen;
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

  async addAdToScreen(screenId: number, adDtos: CreateAdsDto | CreateAdsDto[]) {
    const screen = await this.screenRepository.findOne({
      where: { id: screenId },
      relations: { ads: true },
    });

    if (!screen) {
      return 'Screen not found';
    }

    // If adDtos is a single ad, convert it to an array to simplify the logic
    const adsArray = Array.isArray(adDtos) ? adDtos : [adDtos];

    // Create and save each ad
    const newAds: Ads[] = [];
    for (const adDto of adsArray) {
      const newAd = new Ads(adDto);
      await this.entityManager.save(newAd); // Save each new ad individually
      newAds.push(newAd);
    }

    // Append the new ads to the screen's ads array
    screen.ads.push(...newAds);

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


  //Assign a user to a screen
  async assignUser(screenId: number, userId: number) {
    const screen = await this.screenRepository.findOne({
      where: { id: screenId },
      relations: ['user'],
    });

    if (!screen) {
      throw new NotFoundException('Screen not found');
    }

    const user = await this.entityManager.findOne(User, { where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    screen.user = user;
    await this.entityManager.save(screen);

    return {
      message: 'User assigned to screen successfully',
      screen,
    };
  }


}
