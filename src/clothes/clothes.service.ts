import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClothSetEntity } from 'src/entities/clothesSet.entity';
import { ClothEntity } from 'src/entities/clothes.entity';
import { UserEntity } from 'src/entities/users.entity';

@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(ClothEntity)
    private readonly clothesEntity: Repository<ClothEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getClothesSetIdByTemperature(
    perceivedTemperature: number,
    loginUserId?: number,
  ): Promise<{ temperatureSensitivity?: number; clothSets : ClothSetEntity[]}> {
    let temperatureSensitivity: number | undefined;

    if (loginUserId) {
      const user = await this.userRepository.findOneBy({ id: loginUserId });

      if (user) {
        temperatureSensitivity = user.temperatureSensitivity;
      }
    }

    const clothEntitiesQueryBuilder = await this.clothesEntity
      .createQueryBuilder('cloth')
      .where(
        ':perceivedTemperature BETWEEN cloth.lowPerceivedTemperature AND cloth.highPerceivedTemperature',
        { perceivedTemperature },
      )
      .leftJoinAndSelect('cloth.clothesSetId', 'clothSet')
      .leftJoinAndSelect('clothSet.clothesTopId', 'clothesTop')
      .leftJoinAndSelect('clothSet.clothesBottomId', 'clothesBottom')
      .leftJoinAndSelect('clothSet.clothesCoatId', 'clothesCoat')
      .leftJoinAndSelect('clothSet.clothesAccessoryId', 'clothesAccessory');

    const clothEntities = await clothEntitiesQueryBuilder.getMany();

    if (!clothEntities || clothEntities.length === 0) {
      throw new NotFoundException('주어진 온도에 해당하는 옷 세트가 없습니다');
    }

    const clothSets: ClothSetEntity[] = clothEntities.map(
      (cloth) => cloth.clothesSetId,
    );

    return { temperatureSensitivity, clothSets };
  }
}
