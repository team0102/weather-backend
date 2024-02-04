import { Controller, Get, Query } from '@nestjs/common';
import { WeatherDto } from './dto/get-temperature.dto';
import { ClothSetEntity } from 'src/entities/clothesSet.entity';
import { ClothesService } from './clothes.service';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Get()
  async getClothesSetIdByWeather(
    @Query() weatherDto: WeatherDto,
  ): Promise<ClothSetEntity[]> {
    const { temperature } = weatherDto;

    return this.clothesService.getClothesSetIdByTemperature(temperature);
  }
}
