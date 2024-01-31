import { Injectable } from '@nestjs/common';
import { ClothesRepository } from './clothes.repository';

@Injectable()
export class ClothesService {
  constructor(private readonly clothesRepository: ClothesRepository) {}

  async getClothesSetIdByWeatherId(weatherId: number) {
    try {
      const clothesSetId =
        await this.clothesRepository.getClothesSetIdByWeatherId(weatherId);

      return clothesSetId;
    } catch (error) {
      throw new Error('Fail to get feedList');
    }
  }
}
