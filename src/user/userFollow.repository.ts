import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserFollowEntity } from 'src/entities/userFollows.entity';
import { UserFollowDto } from './dto/user.dto';

@Injectable()
export class UserFollowRepository {
  constructor(
    @InjectRepository(UserFollowEntity)
    private readonly userFollowRepository: Repository<UserFollowEntity>,
  ) {}

  // follow관계 존재 여부 확인(개수)
  async checkFollowOverlap(userFollowDto): Promise<number> {
    const { userId, followUserId } = userFollowDto;

    return await this.userFollowRepository.countBy({
      user: { id: userId },
      followUser: { id: followUserId },
    });
  }

  async createUserFollow(userFollowDto: UserFollowEntity): Promise<void> {
    await this.userFollowRepository.save(userFollowDto);
  }

  async findFollowRelationByUserIdAndFollowUserId(
    userFollowDto: UserFollowDto,
  ): Promise<UserFollowEntity[] | null> {
    const { userId, followUserId } = userFollowDto;

    return await this.userFollowRepository.find({
      select: {
        user: { id: true },
        followUser: { id: true },
      },
      where: {
        user: { id: userId },
        followUser: { id: followUserId },
      },
      relations: {
        user: true,
        followUser: true,
      },
    });
  }

  async deleteUserFollow(followRelation: UserFollowEntity[]): Promise<void> {
    await this.userFollowRepository.remove(followRelation);
  }
}
