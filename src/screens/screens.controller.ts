import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScreensService } from './screens.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { Ads } from './entities/ads.entity';
import { CreateAdsDto } from './dto/create-ads.dto';
import { UpdateAdsDto } from './dto/update-ads-dto';

@Controller('screens')
export class ScreensController {
  constructor(private readonly screensService: ScreensService) {}

  @Post()
  create(@Body() createScreenDto: CreateScreenDto) {
    return this.screensService.create(createScreenDto);
  }

  @Get()
  findAll() {
    return this.screensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenDto: UpdateScreenDto) {
    return this.screensService.update(+id, updateScreenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screensService.remove(+id);
  }

  @Post(':id/ads')
  addAdToScreen(@Param('id') id: number, @Body() adDto: CreateAdsDto) {
    return this.screensService.addAdToScreen(+id, adDto);
  }

  @Patch(':screenId/ads/:adId')
  updateAd(
    @Param('screenId') screenId: number,
    @Param('adId') adId: number,
    @Body() updateAdDto: UpdateAdsDto
  ) {
    return this.screensService.updateAd(+screenId, +adId, updateAdDto);
  }

  @Delete(':screenId/ads/:adId')
  removeAd(@Param('screenId') screenId: number, @Param('adId') adId: number) {
    return this.screensService.removeAd(+screenId, +adId);
  }

}
