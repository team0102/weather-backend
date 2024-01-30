import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedTagEntity } from 'src/entities/feedTags.entity';
import { FeedEntity } from 'src/entities/feeds.entity';
import { TagEntity } from 'src/entities/tags.entity';
import { Repository, QueryRunner } from 'typeorm';

@Injectable()
export class feedTagRepository {
  constructor(
    @InjectRepository(FeedTagEntity)
    private readonly feedTagRepository: Repository<FeedTagEntity>,
  ) {}

  async createFeedTags(
    feedId: number,
    tagIds: number[],
    newDate: Date,
    queryRunner: QueryRunner,
  ) {
    try {
      const savedFeedTags = await Promise.all(
        tagIds.map(async (tagId) => {
          const feedTag = new FeedTagEntity();
          feedTag.feed = { id: feedId } as FeedEntity;
          feedTag.tag = { id: tagId } as TagEntity;
          feedTag.createdAt = newDate;
          feedTag.updatedAt = newDate;

          const savedFeedTag = await queryRunner.manager.save(feedTag);
          return savedFeedTag;
        }),
      );
      console.log('createFeedTag result : ', savedFeedTags);
      return savedFeedTags;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
