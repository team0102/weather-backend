import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClothEntity } from 'src/entities/clothes.entity';
import { WeatherEntity } from 'src/entities/weather.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClothesRepository {
  constructor(
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
  ) {}
}
