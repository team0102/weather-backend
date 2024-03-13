import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { BasePaginationDto } from "./../../common/dto/base-pagination.dto";

export class PaginateFeedDto extends BasePaginationDto {

    @IsNumber()
    @IsOptional()
    weatherConditonId?: number;
  
    @IsBoolean()
    @IsOptional()
    followingUser?: boolean;
  
    //기온 추가
}