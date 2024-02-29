import { UserRepository } from 'src/user/user.repository';
import { ClothesRepository } from './clothes.repository';
import { ClothesResponseDto } from './dto/cloth-response.dto';
export declare class ClothesService {
    private readonly clothRepository;
    private readonly userRepository;
    constructor(clothRepository: ClothesRepository, userRepository: UserRepository);
    getClothesSetIdByTemperature(perceivedTemperature: number, loginUserId?: number): Promise<ClothesResponseDto>;
}
