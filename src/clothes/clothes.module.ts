import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothEntity } from 'src/entities/clothes.entity';
import { UserEntity } from 'src/entities/users.entity';
import { TokenService } from 'src/utils/verifyToken';
import { ClothesRepository } from './clothes.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClothEntity, UserEntity])],
  controllers: [ClothesController],
  providers: [ClothesService, TokenService, ClothesRepository, UserRepository],
})
export class ClothesModule {}
