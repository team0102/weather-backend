import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClothEntity } from 'src/entities/clothes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClothesRepository {
  constructor(
    @InjectRepository(ClothEntity)
    private readonly clothesRepository: Repository<ClothEntity>,
  ) {}

  async getClothesSetIdByWeatherId(weatherId: number): Promise<ClothEntity[]> {
    try {
      const cloth = this.clothesRepository.find({
        where: { weatherId: { id: weatherId } },
        relations: { clothesSetId: true },
      });

      return cloth;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
