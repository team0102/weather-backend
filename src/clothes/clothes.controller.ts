import { Controller, Get, Param } from '@nestjs/common';
import { ClothesService } from './clothes.service';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Get('/:weatherId')
  async getClothes(@Param('weatherId') weatherId: number) {
    const cloth = await this.clothesService.getClothesSetIdByWeatherId(weatherId);

    return cloth;
  }
}
