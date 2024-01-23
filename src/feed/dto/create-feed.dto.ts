import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFeedDTO {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly weatherConditionId: number;

  @IsNumber()
  readonly highTemperature: number;

  @IsNumber()
  readonly lowTemperature: number;

  @IsString()
  readonly image: string;

  @IsString()
  readonly content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // 각 요소가 문자열인 배열임을 나타냄
  readonly tag: string[];
}
