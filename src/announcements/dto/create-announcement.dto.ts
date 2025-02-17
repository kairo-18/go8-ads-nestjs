import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsBoolean, IsArray } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  flightNumber: string;

  @IsString()
  @IsOptional()
  gate?: string;

  @IsInt()
  @Min(1)
  duration: number; // Duration in seconds

  @IsBoolean()
  @IsOptional()
  active?: boolean = true; // Default to active

  @IsOptional()
  @IsArray()
  screenIds?: number[];
}
