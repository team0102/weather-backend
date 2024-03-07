import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { BasePaginationDto } from "src/common/dto/base-pagination.dto";

export class PaginateFeedDto extends BasePaginationDto {

    @IsNumber()
    @IsOptional()
    wheatherConditonId?: number;
  
    @IsBoolean()
    @IsOptional()
    followedUser?: boolean;
  
    //기온 추가
}