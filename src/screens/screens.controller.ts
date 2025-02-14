import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ScreensService } from './screens.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
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
  @UseGuards(AuthGuard('jwt')) 
  findAll() {
    return this.screensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screensService.findOne(+id);
  }

  @Patch(':id') // Protect update screen
  update(@Param('id') id: string, @Body() updateScreenDto: UpdateScreenDto) {
    return this.screensService.update(+id, updateScreenDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) // Protect delete screen
  remove(@Param('id') id: string) {
    return this.screensService.remove(+id);
  }

  @Post(':id/ads')
  addAdToScreen(@Param('id') id: number, @Body() adDto: CreateAdsDto) {
    return this.screensService.addAdToScreen(+id, adDto);
  }

  @Patch(':screenId/ads/:adId')
  @UseGuards(AuthGuard('jwt')) // Protect update ad
  updateAd(
    @Param('screenId') screenId: number,
    @Param('adId') adId: number,
    @Body() updateAdDto: UpdateAdsDto
  ) {
    return this.screensService.updateAd(+screenId, +adId, updateAdDto);
  }

  @Delete(':screenId/ads/:adId')
  @UseGuards(AuthGuard('jwt')) // Protect delete ad
  removeAd(@Param('screenId') screenId: number, @Param('adId') adId: number) {
    return this.screensService.removeAd(+screenId, +adId);
  }
}
