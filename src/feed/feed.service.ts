import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { TagRepository } from './tag.repository';
import { feedTagRepository } from './feedTag.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly tagRepository: TagRepository,
    private readonly feedTagRepository: feedTagRepository,
    private readonly dataSource: DataSource,
  ) {}

  async createFeed(feedData: CreateFeedDTO) {
    const newDate = new Date();
    const { tag } = feedData;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const savedFeed = await this.feedRepository.createFeed(feedData, newDate);
      const savedFeedId = savedFeed.feed.id;
      // Array to store tag IDs
      let savedTagIds: number[] = [];
      // Iterate through tags
      for (const tagValue of tag) {
        const foundTag = await this.tagRepository.findTagByContent(tagValue);
        if (!foundTag) {
          const savedTag = await this.tagRepository.createTag(
            tagValue,
            newDate,
          );
          savedTagIds.push(savedTag.id);
        } else {
          savedTagIds.push(foundTag.id);
        }
      }
      const savedFeedTag = await this.feedTagRepository.createFeedTags(
        savedFeedId,
        savedTagIds,
        newDate,
        queryRunner,
      );
      // 같은 트랜잭션을 사용하도록 queryRunner를 전달
      await queryRunner.commitTransaction();
      return { savedFeed, savedFeedTag };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error.message);
      throw new Error('Fail to create feed');
    } finally {
      await queryRunner.release();
    }
  }
}
