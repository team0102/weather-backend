import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { TagRepository } from './tag.repository';
import { FeedTagRepository } from './feedTag.repository';
import { DataSource } from 'typeorm';
import { FeedCommentRepository } from './feedComment.repository';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly tagRepository: TagRepository,
    private readonly feedTagRepository: FeedTagRepository,
    private readonly feedCommentRepository: FeedCommentRepository,
    private readonly dataSource: DataSource,
  ) {}

  async getFeedList(userId: number): Promise<any[]> {
    try {
      const feedList = await this.feedRepository.getFeedListWithDetails();
      const processedFeedList = await Promise.all(
        feedList.map(async (feed) => {
          const isAuthor = feed.userId === userId;
          const likeCount = feed.feedLike.length;
          const commentCount = feed.feedComment.length;
          const isLiked = feed.feedLike.some((like) => like.userId === userId);
          const isBookmarked = feed.bookmark.some(
            (bookmark) => bookmark.userId === userId,
          );
          return {
            ...feed,
            isAuthor,
            likeCount,
            commentCount,
            isLiked,
            isBookmarked,
          };
        }),
      );
      return processedFeedList;
    } catch (error) {
      console.log(error.message);
      throw new Error('Fail to get feedList');
    }
  }

  async getFeedDetails(userId: number, feedId: number) {
    try {
      const feedDetails =
        await this.feedRepository.getFeedWithDetailsById(feedId);
      const isAuthor = feedDetails.user.id === userId;
      const likeCount = feedDetails.feedLike.length;
      const commentCount = feedDetails.feedComment.length;
      const isLiked = feedDetails.feedLike.some(
        (like) => like.user.id === userId,
      );
      const isBookmarked = feedDetails.bookmark.some(
        (bookmark) => bookmark.user.id === userId,
      );

      const processedFeedDetails = {
        ...feedDetails,
        isAuthor,
        likeCount,
        commentCount,
        isLiked,
        isBookmarked,
      };
      return processedFeedDetails;
    } catch (error) {
      console.log(error.message);
      throw new Error('Fail to get feedDetails');
    }
  }

  //해시태그 추출
  extractTagsFromContent(content: string): string[] {
    const tagRegex = /#(\S+)/g; //모든 문자
    const matches = content.match(tagRegex);
    return matches ? matches.map((match) => match.slice(1)) : [];
  }

  async createFeed(loginUserId: number, feedData: CreateFeedDTO) {
    const newDate = new Date();
    const { content } = feedData;
    const tags = this.extractTagsFromContent(content);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const savedFeed = await this.feedRepository.createFeed(loginUserId, feedData, newDate);
      const savedFeedId = savedFeed.feed.id;
      // Array to store tag IDs
      let savedTagIds: number[] = [];
      // Iterate through tags
      for (const tagValue of tags) {
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

  async createComment(loginUserId: number, feedId: number, content: string) {
    try {
      const newDate = new Date();
      const findFeed = await this.feedRepository.findFeedById(feedId);
      if (!findFeed) throw new Error('Feed does not exist');
      await this.feedCommentRepository.createComment(
        loginUserId,
        feedId,
        content,
        newDate,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
