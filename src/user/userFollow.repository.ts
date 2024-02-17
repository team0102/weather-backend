import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserFollowEntity } from 'src/entities/userFollows.entity';
import { UserFollowDto } from './dto/user.dto';

@Injectable()
export class UserFollowRepository {
  constructor(
    @InjectRepository(UserFollowEntity)
    private readonly userFollowTypeormRepository: Repository<UserFollowEntity>,
  ) {}

  // follow관계 존재 여부 확인(개수)
  async checkFollowOverlap(userFollowDto): Promise<number> {
    const { userId, followUserId } = userFollowDto;

    return await this.userFollowTypeormRepository.countBy({
      user: { id: userId },
      followUser: { id: followUserId },
    });
  }

  async createUserFollow(userFollowDto: UserFollowEntity): Promise<void> {
    await this.userFollowTypeormRepository.save(userFollowDto);
  }

  async findFollowRelation(
    userFollowDto: UserFollowDto,
  ): Promise<UserFollowEntity[] | null> {
    const { userId, followUserId } = userFollowDto;

    return await this.userFollowTypeormRepository.find({
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
    await this.userFollowTypeormRepository.remove(followRelation);
  }

  async findFollowingList(userId: number): Promise<UserFollowEntity[] | null> {
    return this.userFollowTypeormRepository.find({
      relations: {
        followUser: true,
      },
      select: {
        id: true,
        followUser: {
          id: true,
          profileImage: true,
          nickname: true,
          createdAt: true,
        },
      },
      where: {
        user: { id: userId },
      },
    });
  }

  async findFollowerList(
    followUserId: number,
  ): Promise<UserFollowEntity[] | null> {
    return this.userFollowTypeormRepository.find({
      relations: { user: true },
      select: {
        id: true,
        user: {
          id: true,
          profileImage: true,
          nickname: true,
          createdAt: true,
        },
      },
      where: {
        followUser: { id: followUserId },
      },
    });
  }
}
