import { ClothEntity } from 'src/entities/clothes.entity';
import { Repository } from 'typeorm';
import { ClothesResponseDto } from './dto/cloth-response.dto';
export declare class ClothesRepository {
    private readonly clothRepository;
    constructor(clothRepository: Repository<ClothEntity>);
    getClothesSetIdByTemperature(perceivedTemperature: number): Promise<ClothesResponseDto>;
}
