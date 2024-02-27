import { IsIn, IsNumber, IsOptional } from "class-validator";

export class BasePaginationDto {
  // 이전 마지막 데이터의 ID
  //@Type(() => Number) // 반환하고 싶은 타입지정 -> main.ts에 enableImplicitConversion로 변환가능
  @IsNumber()
  @IsOptional()
  where__id__more_than?: number;

  @IsNumber()
  @IsOptional()
  where__id__less_than?: number;

  //정렬
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__createdAt?: 'ASC' | 'DESC' = 'DESC'; //기본값 : DESC

  take: number = 12;
}
