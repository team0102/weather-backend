import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothSetEntity } from 'src/entities/clothesSet.entity';
import { ClothEntity } from 'src/entities/clothes.entity';
import { UserEntity } from 'src/entities/users.entity';
import { TokenService } from 'src/utils/verifyToken';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClothEntity, ClothSetEntity, UserEntity]),
  ],
  controllers: [ClothesController],
  providers: [ClothesService, TokenService],
})
export class ClothesModule {}
