import { IsNumber, IsString } from 'class-validator';

export class CreateFeedDTO {

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

}
