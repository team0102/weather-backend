import {
  Controller,
  Get,
  Headers,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { WeatherDto } from './dto/get-temperature.dto';
import { ClothesService } from './clothes.service';
import { TokenService } from 'src/utils/verifyToken';
import { ClothesResponseDto } from './dto/cloth-response.dto';

@Controller('clothes')
export class ClothesController {
  constructor(
    private readonly clothesService: ClothesService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  async getClothesSetIdByWeather(
    @Query() weatherDto: WeatherDto,
    @Headers('Authorization') token?: string,
  ): Promise<ClothesResponseDto> {
    const { temperature } = weatherDto;

    let loginUserId: number | undefined;

    // 토큰이 존재하면 사용자 확인
    if (token) {
      try {
        loginUserId = await this.tokenService.audienceFromToken(token);
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }

    const result = await this.clothesService.getClothesSetIdByTemperature(
      temperature,
      loginUserId,
    );

    return {
      status: 200,
      message: 'Success get Clothes',
      data: result.data,
    };
  }
}
