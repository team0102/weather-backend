import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { TagRepository } from './tag.repository';
import { feedTagRepository } from './feedTag.repository';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly tagRepository: TagRepository,
    private readonly feedTagRepository: feedTagRepository,
  ) {}

  async createFeed(feedData: CreateFeedDTO) {
    try {
      const newDate = new Date();
      const { tag } = feedData;
      const savedFeed = await this.feedRepository.createFeed(feedData, newDate);
      const savedFeedId = savedFeed.feed.id;
      // Array to store tag IDs
      let savedTagIds: number[] = [];
      // Iterate through tags
      for (const tagValue of tag) {
        // Check if tag already exists
        const foundTag = await this.tagRepository.findTagByContent(tagValue);
        // If tag does not exist, create and save it
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
      console.log('id 값', savedTagIds);
      const savedTag = await this.feedTagRepository.createFeedTags(
        savedFeedId,
        savedTagIds,
        newDate,
      );
      return { savedFeed, savedTag };
    } catch (error) {
      console.error(error.message);
      throw new Error('피드 생성에 실패했습니다.');
    }
  }
}
