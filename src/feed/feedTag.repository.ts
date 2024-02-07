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
    queryRunner: QueryRunner,
  ) {
    try {
      await queryRunner.startTransaction();
      const savedFeedTags = await Promise.all(
        tagIds.map(async (tagId) => {
          return this.feedTagRepository.save({
            feed: { id: feedId },
            tag: { id: tagId },
          });
        }),
      );
      await queryRunner.commitTransaction();
      return savedFeedTags;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async deletedFeedTags(
    feedTagsIds: number[],
    queryRunner: QueryRunner,
  ): Promise<void> {
    try {
      await queryRunner.startTransaction();
      for (const feedTagId of feedTagsIds) {
        await this.feedTagRepository.delete(feedTagId);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new Error(error.message);
    }
  }
}
