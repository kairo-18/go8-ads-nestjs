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
}
