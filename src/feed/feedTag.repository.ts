import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedTagEntity } from 'src/entities/feedTags.entity';
import { Repository, QueryRunner, In } from 'typeorm';

@Injectable()
export class FeedTagRepository {
  constructor(
    @InjectRepository(FeedTagEntity)
    private readonly feedTagRepository: Repository<FeedTagEntity>,
  ) {}

  async createFeedTags(
    feedId: number,
    tagIds: number[],
  ) {
    try {
      const savedFeedTags = await Promise.all(
        tagIds.map(async (tagId) => {
          return this.feedTagRepository.save({
            feed: { id: feedId },
            tag: { id: tagId },
          });
        }),
      );
      return savedFeedTags;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async deleteFeedTags(
    feedTagsIds: number[],
  ): Promise<void> {
    try {
      for (const feedTagId of feedTagsIds) {
        await this.feedTagRepository.delete(feedTagId);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
