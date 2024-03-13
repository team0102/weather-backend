import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothEntity } from '../entities/clothes.entity';
import { UserEntity } from '../entities/users.entity';
import { TokenService } from '../utils/verifyToken';
import { ClothesRepository } from './clothes.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClothEntity, UserEntity])],
  controllers: [ClothesController],
  providers: [ClothesService, TokenService, ClothesRepository, UserRepository],
})
export class ClothesModule {}
