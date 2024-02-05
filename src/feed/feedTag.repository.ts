import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedTagEntity } from 'src/entities/feedTags.entity';
import { FeedEntity } from 'src/entities/feeds.entity';
import { TagEntity } from 'src/entities/tags.entity';
import { Repository, QueryRunner } from 'typeorm';

@Injectable()
export class FeedTagRepository {
  constructor(
    @InjectRepository(FeedTagEntity)
    private readonly feedTagRepository: Repository<FeedTagEntity>,
  ) {}

  async createFeedTags(
    feedId: number,
    tagIds: number[],
    queryRunner: QueryRunner,
  ) {
    try {
      await queryRunner.startTransaction();
      const savedFeedTags = await Promise.all(
        tagIds.map(async (tagId) => {
          return this.feedTagRepository.save({
            feed: { id: feedId },
            tag: { id: tagId},
          })
        }),
      );
      await queryRunner.commitTransaction();
      console.log('createFeedTag result : ', savedFeedTags);
      return savedFeedTags;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
