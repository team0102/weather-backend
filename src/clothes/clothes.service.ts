import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClothSetEntity } from 'src/entities/clothesSet.entity';
import { ClothEntity } from 'src/entities/clothes.entity';

@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(ClothEntity)
    private readonly clothesEntity: Repository<ClothEntity>,
  ) {}

  async getClothesSetIdByTemperature(
    perceivedTemperature: number,
  ): Promise<ClothSetEntity[]> {
    const clothEntities = await this.clothesEntity
      .createQueryBuilder('cloth')
      .where(
        ':perceivedTemperature BETWEEN cloth.lowPerceivedTemperature AND cloth.highPerceivedTemperature',
        { perceivedTemperature },
      )
      .leftJoinAndSelect('cloth.clothesSetId', 'clothSet')
      .leftJoinAndSelect('clothSet.clothesTopId', 'clothesTop')
      .leftJoinAndSelect('clothSet.clothesBottomId', 'clothesBottom')
      .leftJoinAndSelect('clothSet.clothesCoatId', 'clothesCoat')
      .leftJoinAndSelect('clothSet.clothesAccessoryId', 'clothesAccessory')
      .getMany();

    if (!clothEntities || clothEntities.length === 0) {
      throw new NotFoundException('주어진 온도에 해당하는 옷 세트가 없습니다');
    }

    const clothSets: ClothSetEntity[] = clothEntities.map(
      (cloth) => cloth.clothesSetId,
    );

    return clothSets;
  }
}
