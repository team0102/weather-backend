import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { ClothesRepository } from './clothes.repository';
import { ClothesResponseDto } from './dto/cloth-response.dto';

@Injectable()
export class ClothesService {
  constructor(
    private readonly clothRepository: ClothesRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getClothesSetIdByTemperature(
    perceivedTemperature: number,
    loginUserId?: number,
  ): Promise<ClothesResponseDto> {
    if (loginUserId) {
      await this.userRepository.findOneById(loginUserId);
    }

    const getClothesSetIdByTemperature =
      await this.clothRepository.getClothesSetIdByTemperature(
        perceivedTemperature,
      );

    return getClothesSetIdByTemperature;
  }
}
