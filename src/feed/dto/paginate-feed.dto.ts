import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional } from "class-validator";

export class PaginateFeedDto{
    // 이전 마지막 데이터의 ID
    // 이 프로퍼티에 입력한 ID 보다 높은 ID 부터 값을 가져오기
    //@Type(() => Number) // 반환하고 싶은 타입지정 -> main.ts에 enableImplicitConversion로 변환가능
    @IsNumber()
    @IsOptional()
    where__id_more_than?: number;

    @IsNumber()
    @IsOptional()
    where__id_less_than?: number;

    //정렬
    @IsIn(['ASC', 'DESC'])
    @IsOptional()
    order__createdAt?: 'ASC' | 'DESC' = 'ASC'; //기본값 : ASC

    take: number = 9;
}