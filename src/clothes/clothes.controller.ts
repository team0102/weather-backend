import { Controller, Get, Param } from '@nestjs/common';
import { ClothesService } from './clothes.service';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Get('/:weatherId')
  async getClothes(@Param('weatherId') weatherId: number) {
    try {
      const cloth =
        await this.clothesService.getClothesSetIdByWeatherId(weatherId);

      return {
        statusCode: 200,
        message: 'Success',
        data: cloth,
      };
    } catch (error) {
      return {
        statusCode: error.code || 500,
        message: error.message,
      };
    }
  }
}
