import { WeatherDto } from './dto/get-temperature.dto';
import { ClothesService } from './clothes.service';
import { TokenService } from 'src/utils/verifyToken';
import { ClothesResponseDto } from './dto/cloth-response.dto';
export declare class ClothesController {
    private readonly clothesService;
    private readonly tokenService;
    constructor(clothesService: ClothesService, tokenService: TokenService);
    getClothesSetIdByWeather(weatherDto: WeatherDto, token?: string): Promise<ClothesResponseDto>;
}
