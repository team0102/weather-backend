import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedLikeEntity } from './../entities/feedLikes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedLikeRepository {
  constructor(
    @InjectRepository(FeedLikeEntity)
    private readonly feedLikeRepository: Repository<FeedLikeEntity>,
  ) {}

  async findFeedLikeByFeedIdAndUserId(
    loginUserId: number,
    feedId: number,
  ): Promise<FeedLikeEntity> {
    console.log(loginUserId, feedId);
    const result = await this.feedLikeRepository.findOne({
      where: {
        user: { id: loginUserId },
        feed: { id: feedId },
      },
    });
    console.log(result);
    return result;
  }

  async createFeedLike(loginUserId: number, feedId: number): Promise<void> {
    await this.feedLikeRepository.save({
      user: { id: loginUserId },
      feed: { id: feedId },
    });
  }

  async deleteFeedLike(id: number): Promise<void> {
    await this.feedLikeRepository.delete({ id });
  }

  async deleteFeedLikesByIds(ids: number[]): Promise<void> {
    await this.feedLikeRepository.delete(ids);
  }
}
