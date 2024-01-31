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
    const { T1H, WSD } = weatherDto;

    //계산식에서 풍속이 km/h 이므로 m/s로 바꿔줘야함
    const V = WSD * 3.6;

    const C =
      13.12 +
      0.6215 * T1H -
      11.37 * Math.pow(V, 0.16) +
      0.3965 * Math.pow(V, 0.16) * T1H;

    return this.clothesService.getClothesSetIdByTemperature(C);
  }
}
