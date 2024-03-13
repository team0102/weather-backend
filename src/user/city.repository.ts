import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CityEntity } from './../entities/cities.entity';

@Injectable()
export class CityRepository {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityTypeormRepository: Repository<CityEntity>,
  ) {}

  async findCityByCityId(cityId: number): Promise<CityEntity | null> {
    return await this.cityTypeormRepository.findOneBy({
      id: cityId,
    });
  }
  // async findCityByCityId(cityId: CityEntity): Promise<CityEntity | null> {
  //   return await this.cityTypeormRepository.findOne({
  //     where: {
  //       id: cityId,
  //     },
  //   });
  // }
}
