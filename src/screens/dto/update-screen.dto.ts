import { PartialType } from '@nestjs/mapped-types';
import { CreateScreenDto } from './create-screen.dto';
import { CreateAdsDto } from './create-ads.dto';

export class UpdateScreenDto {
    name: string;
    routeName: string;

    ads: CreateAdsDto[];
}
