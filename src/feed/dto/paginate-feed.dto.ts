import { IsIn, IsNumber, IsOptional } from "class-validator";

export class PaginateFeedDto{
    // 이전 마지막 데이터의 ID
    // 이 프로퍼티에 입력한 ID 보다 높은 ID 부터 값을 가져오기
    @IsNumber()
    @IsOptional()
    where__id_more_than?: number;

    //정렬
    //오름차순 디폴트로 가정
    @IsIn(['ASC'])
    @IsOptional()
    order__createdAt?: 'ASC' = 'ASC'; //기본값

    take: number = 9;
}