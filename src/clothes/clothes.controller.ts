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

    const temperature =
      13.12 +
      0.6215 * T1H -
      11.37 * Math.pow(WSD, 0.16) +
      0.3965 * Math.pow(WSD, 0.16) * T1H;
    console.log(temperature);

    //ex) 5~9, 10~14와 같이 5 단위로 범위를 지정
    const perceivedTemperature = Math.floor(temperature / 5) * 5;

    console.log(perceivedTemperature);

    if (T1H > 10 || WSD < 1.3) {
      // 만약 특정 조건이 충족되면 온도만 반환
      return this.clothesService.getClothesSetIdByTemperature(T1H);
    }

    return this.clothesService.getClothesSetIdByTemperature(
      perceivedTemperature,
    );
  }
}
