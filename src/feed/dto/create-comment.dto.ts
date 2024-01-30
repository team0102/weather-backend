import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsNumber()
  readonly feedId: number;

  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly content: string;
}
