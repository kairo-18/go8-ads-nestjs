import { CreateAdsDto } from "./create-ads.dto";

export class CreateScreenDto {
    name: string;
    routeName: string;
    layoutType: string;
    ads: CreateAdsDto[];
}
