import { Injectable, NotFoundException } from '@nestjs/common';
import { ClothesRepository } from './clothes.repository';

@Injectable()
export class ClothesService {
  constructor(private readonly clothesRepository: ClothesRepository) {}

  async getClothesSetIdByWeatherId(weatherId: number) {
    try {
      const clothesSetId =
        await this.clothesRepository.getClothesSetIdByWeatherId(weatherId);

      if (!clothesSetId || clothesSetId.length === 0) {
        throw new NotFoundException('cloth not found');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
