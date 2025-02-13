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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt')) // Protect route
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt')) // Protect route
  @Get(':username')
  async findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id')id: string,@Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(+id, updateUserDto);
    if (!updatedUser) {
      return { message: 'User not found' };
    }
    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt')) // Protect route
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.usersService.remove(+id);
    if (!deleted) {
      return { message: 'User not found or already deleted' };
    }
    return { message: 'User deleted successfully' };
  }

 
}
