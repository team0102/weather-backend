import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherEntity } from 'src/entities/weather.entity';
import { Repository } from 'typeorm';
import { ClothSetEntity } from 'src/entities/clothesSet.entity';

@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
  ) {}

  async getClothesSetIdByTemperature(
    perceivedTemperature: number,
  ): Promise<ClothSetEntity[]> {
    const [weather] = await this.weatherRepository.find({
      where: {
        temperature: perceivedTemperature,
      },
      relations: [
        'clothes.clothesSetId',
        'clothes.clothesSetId.clothesTopId',
        'clothes.clothesSetId.clothesBottomId',
        'clothes.clothesSetId.clothesCoatId',
        'clothes.clothesSetId.clothesAccessoryId',
      ],
    });

    if (!weather) {
      throw new NotFoundException('weather not found');
    }

    const clothesSetId = weather.clothes.map((cloth) =>
      cloth ? cloth.clothesSetId : null,
    );

    if (!clothesSetId || clothesSetId.length === 0) {
      throw new NotFoundException('cloth not found');
    }

    return clothesSetId;
  }
}
