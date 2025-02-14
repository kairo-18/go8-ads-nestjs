import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual} from 'typeorm';
import { Ads } from './entities/ads.entity';

@Injectable()
export class AdsCleanupService {
  constructor(
    @InjectRepository(Ads)
    private readonly adsRepository: Repository<Ads>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const now = new Date();
    const expiredAds = await this.adsRepository.find({
      where: { endDate: LessThanOrEqual(now) },
    });

    if (expiredAds.length > 0) {
      await this.adsRepository.remove(expiredAds);
      console.log(`Removed ${expiredAds.length} expired ads.`);
    }
  }
  
}
