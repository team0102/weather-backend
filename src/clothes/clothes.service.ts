import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClothEntity } from 'src/entities/clothes.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(ClothEntity)
    private readonly clothesEntity: Repository<ClothEntity>,
    private readonly userRepository: UserRepository,
  ) {}

  async getClothesSetIdByTemperature(
    perceivedTemperature: number,
    loginUserId?: number,
  ): Promise<ClothEntity[]> {
    if (loginUserId) {
      await this.userRepository.findOneById(loginUserId);
    }

    const clothEntities = await this.clothesEntity
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
