import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClothEntity } from 'src/entities/clothes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClothesRepository {
  constructor(
    @InjectRepository(ClothEntity)
    private readonly clothRepository: Repository<ClothEntity>,
  ) {}

  async getClothesSetIdByTemperature(
    perceivedTemperature: number,
  ): Promise<ClothEntity[]> {

    const clothEntities = await this.clothRepository
      .createQueryBuilder('cloth')
      .where(
        ':perceivedTemperature BETWEEN cloth.lowPerceivedTemperature AND cloth.highPerceivedTemperature',
        { perceivedTemperature },
      )
      .leftJoinAndSelect('cloth.clothesTopId', 'clothesTop')
      .leftJoinAndSelect('cloth.clothesBottomId', 'clothesBottom')
      .leftJoinAndSelect('cloth.clothesCoatId', 'clothesCoat')
      .leftJoinAndSelect('cloth.clothesAccessoryId', 'clothesAccessory')
      .getMany();

    if (!clothEntities || clothEntities.length === 0) {
      throw new NotFoundException('주어진 온도에 해당하는 옷 세트가 없습니다');
    }

    return clothEntities;
  }
}
