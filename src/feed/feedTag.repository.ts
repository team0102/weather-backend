import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedTagEntity } from 'src/entities/feedTags.entity';
import { FeedEntity } from 'src/entities/feeds.entity';
import { TagEntity } from 'src/entities/tags.entity';
import { Repository, QueryRunner } from 'typeorm';

@Injectable()
export class feedTagRepository {
  constructor(
    // @InjectRepository(FeedEntity)
    // private readonly feedRepository: Repository<FeedEntity>,
    // @InjectRepository(TagEntity)
    // private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(FeedTagEntity)
    private readonly feedTagRepository: Repository<FeedTagEntity>,
  ) {}

  async createFeedTags(feedId: number, tagIds: number[], newDate: Date, queryRunner: QueryRunner) {
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
  }
}
