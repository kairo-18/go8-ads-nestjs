import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
      role: createUserDto.role,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user || undefined;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
  
    if (!user) {
      return null;
    }
  
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
  
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { id } });
  }
  
  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected ? true : false;
  }
  
  
}
