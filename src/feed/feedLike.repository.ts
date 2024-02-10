import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedLikeEntity } from 'src/entities/feedLikes.entity';
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
    try {
      console.log(loginUserId, feedId);
      const result = await this.feedLikeRepository.findOne({
        where: {
          user: { id: loginUserId },
          feed: { id: feedId },
        },
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async createFeedLike(loginUserId: number, feedId: number): Promise<void> {
    try {
      const result = await this.feedLikeRepository.save({
        user: { id: loginUserId },
        feed: { id: feedId },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async deleteFeedLike(id: number): Promise<void> {
    try {
      await this.feedLikeRepository.delete({ id });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async deleteFeedLikesByIds(ids: number[]): Promise<void> {
    try {
      await this.feedLikeRepository.delete(ids);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
