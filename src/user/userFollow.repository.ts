import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserFollowEntity } from 'src/entities/userFollows.entity';

@Injectable()
export class UserFollowRepository {
  constructor(
    @InjectRepository(UserFollowEntity)
    private readonly userFollowRepository: Repository<UserFollowEntity>,
  ) {}

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
}
