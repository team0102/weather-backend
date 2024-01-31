import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothEntity } from 'src/entities/clothes.entity';
import { WeatherEntity } from 'src/entities/weather.entity';
import { ClothesRepository } from './clothes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClothEntity, WeatherEntity])],
  controllers: [ClothesController],
  providers: [ClothesService, ClothesRepository],
})
export class ClothesModule {}
