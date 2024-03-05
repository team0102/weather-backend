import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClothEntity } from 'src/entities/clothes.entity';
import { Repository } from 'typeorm';
import { ClothesDto, ClothesResponseDto } from './dto/cloth-response.dto';

@Injectable()
export class ClothesRepository {
  constructor(
    @InjectRepository(ClothEntity)
    private readonly clothRepository: Repository<ClothEntity>,
  ) {}

  async getClothesSetIdByTemperature(
    perceivedTemperature: number,
  ): Promise<ClothesResponseDto> {
    const clothEntities = await this.clothRepository
      .createQueryBuilder('cloth')
      .where(
        ':perceivedTemperature >= cloth.lowPerceivedTemperature AND :perceivedTemperature < cloth.highPerceivedTemperature',
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

    const clothesDtoArray: ClothesDto[] = clothEntities.map((cloth) => ({
      id: cloth.id,
      clothesTopId: {
        id: cloth.clothesTopId.id,
        type: cloth.clothesTopId.type,
        imageUrl: cloth.clothesTopId.image,
      },
      clothesBottomId: {
        id: cloth.clothesBottomId.id,
        type: cloth.clothesBottomId.type,
        imageUrl: cloth.clothesBottomId.image,
      },
      clothesCoatId: {
        id: cloth.clothesCoatId.id,
        type: cloth.clothesCoatId.type,
        imageUrl: cloth.clothesCoatId.image,
      },
      clothesAccessoryId: cloth.clothesAccessoryId
        ? {
            id: cloth.clothesAccessoryId.id,
            type: cloth.clothesAccessoryId.type,
            imageUrl: cloth.clothesAccessoryId.image,
          }
        : null,
    }));

    return { status: 200, message: 'Success', data: clothesDtoArray };
  }
}