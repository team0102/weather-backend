import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClothEntity } from 'src/entities/clothes.entity';
import { UserRepository } from 'src/user/user.repository';
import { ClothesRepository } from './clothes.repository';

@Injectable()
export class ClothesService {
  constructor(
    private readonly clothRepository: ClothesRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getClothesSetIdByTemperature(
    perceivedTemperature: number,
    loginUserId?: number,
  ): Promise<ClothEntity[]> {
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
