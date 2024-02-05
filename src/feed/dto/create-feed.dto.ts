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
  readonly imageUrl: string;

  @IsString()
  readonly content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tag: string[];
}
