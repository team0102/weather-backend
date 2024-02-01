import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserFollowRepository } from './userFollow.repository';
import { UserEntity } from 'src/entities/users.entity';
import { UserFollowEntity } from 'src/entities/userFollows.entity';
import { TokenService } from 'src/utils/verifyToken';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserFollowEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserFollowRepository, TokenService],
  exports: [UserService, UserRepository, UserFollowRepository],
})
export class UserModule {}
