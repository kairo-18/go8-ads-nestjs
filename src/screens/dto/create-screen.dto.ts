import { CreateAdsDto } from "./create-ads.dto";

export class CreateScreenDto {
    name: string;
    routeName: string;
    ads: CreateAdsDto[];
}
