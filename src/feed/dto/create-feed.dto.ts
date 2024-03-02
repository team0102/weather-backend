import { IsNumber, IsString } from 'class-validator';

export class CreateFeedDTO {

  @IsNumber()
  readonly weatherConditionId: number;

  @IsNumber()
  readonly highTemperature: number;

  @IsNumber()
  readonly lowTemperature: number;

  imageUrl: string | Express.Multer.File;

  @IsString()
  readonly content: string;

}
