import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedTagEntity } from './../entities/feedTags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedTagRepository {
  constructor(
    @InjectRepository(FeedTagEntity)
    private readonly feedTagRepository: Repository<FeedTagEntity>,
  ) {}

  async createFeedTags(feedId: number, tagIds: number[]) {
    const savedFeedTags = await Promise.all(
      tagIds.map(async (tagId) => {
        return this.feedTagRepository.save({
          feed: { id: feedId },
          tag: { id: tagId },
        });
      }),
    );
    return savedFeedTags;
  }

  async deleteFeedTags(feedTagsIds: number[]): Promise<void> {
    for (const feedTagId of feedTagsIds) {
      await this.feedTagRepository.delete(feedTagId);
    }
  }
}
