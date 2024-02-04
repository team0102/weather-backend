import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothSetEntity } from 'src/entities/clothesSet.entity';
import { ClothEntity } from 'src/entities/clothes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClothEntity, ClothSetEntity])],
  controllers: [ClothesController],
  providers: [ClothesService],
})
export class ClothesModule {}
