import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { TagRepository } from './tag.repository';
import { FeedTagRepository } from './feedTag.repository';
import { DataSource } from 'typeorm';
import { FeedCommentRepository } from './feedComment.repository';
import { UpdateFeedDTO } from './dto/update-feed.dto';
import { FeedDatail, FeedListItem } from './feed.types';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly tagRepository: TagRepository,
    private readonly feedTagRepository: FeedTagRepository,
    private readonly feedCommentRepository: FeedCommentRepository,
    private readonly dataSource: DataSource,
  ) {}

  async getFeedList(userId: number): Promise<FeedListItem[]> {
    try {
      const feedList = await this.feedRepository.getFeedListWithDetails();
      const processedFeedList = await Promise.all(
        feedList.map(async (feed) => {
          const isAuthor = feed.user.id === userId;
          const likeCount = feed.feedLike.length;
          const commentCount = feed.feedComment.length;
          const isLiked = feed.feedLike.some((like) => like.user.id === userId);
          const isBookmarked = feed.bookmark.some(
            (bookmark) => bookmark.user.id === userId,
          );
          const { id, nickname, profileImage } = feed.user;
          const imageUrl =
            feed.feedImage.length > 0 ? feed.feedImage[0].imageUrl : null;
          const {
            content,
            lowTemperature,
            highTemperature,
            createdAt,
            updatedAt,
          } = feed;
          return {
            id: feed.id,
            imageUrl,
            content,
            lowTemperature,
            highTemperature,
            weatherConditionId: feed.weatherCondition.id,
            createdAt,
            updatedAt,
            author: { id, nickname, profileImage },
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

  async getFeedDetails(userId: number, feedId: number): Promise<FeedDatail> {
    try {
      const feedDetails = await this.feedRepository.getFeedWithDetailsById(feedId);
      const isAuthor = feedDetails.user.id === userId;
      const likeCount = feedDetails.feedLike.length;
      const commentCount = feedDetails.feedComment.length;
      const isLiked = feedDetails.feedLike.some(
        (like) => like.user.id === userId,
      );
      const isBookmarked = feedDetails.bookmark.some(
        (bookmark) => bookmark.user.id === userId,
      );
      const { id, nickname, profileImage } = feedDetails.user;
      const imageUrl =
        feedDetails.feedImage.length > 0
          ? feedDetails.feedImage[0].imageUrl
          : null;
      const comment = feedDetails.feedComment.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        author: {
          id: comment.user.id,
          nickname: comment.user.nickname,
          profileImage: comment.user.profileImage,
        },
      }));

      const processedFeed = {
        id: feedDetails.id,
        imageUrl,
        content: feedDetails.content,
        weatherConditionId: feedDetails.weatherCondition.id,
        lowTemperature: feedDetails.lowTemperature,
        highTemperature: feedDetails.highTemperature,
        createdAt: feedDetails.createdAt,
        updatedAt: feedDetails.updatedAt,
        author: { id, nickname, profileImage },
        comment,
        isAuthor,
        likeCount,
        commentCount,
        isLiked,
        isBookmarked,
      };
      return processedFeed;
    } catch (error) {
      console.log(error.message);
      throw new Error('Fail to get feedDetails');
    }
  }

  async createFeed(
    loginUserId: number,
    feedData: CreateFeedDTO,
  ): Promise<boolean> {
    const { content } = feedData;
    const tags = this.extractTagsFromContent(content);
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const savedFeed = await this.feedRepository.createFeed(
        loginUserId,
        feedData,
      );
      const savedFeedId = savedFeed.id;
      const savedTagIds = await this.saveTagsAndGetIds(tags);
      const savedFeedTag = await this.feedTagRepository.createFeedTags(
        savedFeedId,
        savedTagIds,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error.message);
      throw new Error('Fail to create feed');
    } finally {
      await queryRunner.release();
    }
  }

  private async saveTagsAndGetIds(tags: string[]): Promise<number[]> {
    const savedTagIds: number[] = [];
    for (const tagValue of tags) {
      const foundTag = await this.tagRepository.findTagByContent(tagValue);
      if (!foundTag) {
        const savedTag = await this.tagRepository.createTag(tagValue);
        savedTagIds.push(savedTag.id);
      } else {
        savedTagIds.push(foundTag.id);
      }
    }
    return savedTagIds;
  }

  //해시태그 추출
  extractTagsFromContent(content: string): string[] {
    const tagRegex = /#(\S+)/g; //모든 문자
    const matches = content.match(tagRegex);
    return matches ? matches.map((match) => match.slice(1)) : [];
  }

  //=====================update Feed===========================================
  // async updateFeed(
  //   loginUserId: number,
  //   feedId: number,
  //   feedData: UpdateFeedDTO,
  // ) {
  //   const newDate = new Date();
  //   const { content } = feedData;
  //   const tags = this.extractTagsFromContent(content);
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     // 기존 피드 정보 가져오기
  //     const existingFeed = await this.feedRepository.findFeedById(feedId);
  //     if (!existingFeed) throw new Error('Feed does not exist');
  //     if (existingFeed.user.id !== loginUserId) throw new Error('Invalid user');
  //     // 새로운 태그 생성 또는 기존 태그 가져오기
  //     let savedTagIds: number[] = [];
  //     for (const tagValue of tags) {
  //       const foundTag = await this.tagRepository.findTagByContent(tagValue);
  //       if (!foundTag) {
  //         const savedTag = await this.tagRepository.createTag(
  //           tagValue,
  //           newDate,
  //         );
  //         savedTagIds.push(savedTag.id);
  //       } else {
  //         savedTagIds.push(foundTag.id);
  //       }
  //     }
  //     // 기존 태그와 비교하여 feedTag 추가 및 삭제 ********* 작성중 *****************

  //     //기존 피드가 가지고 있던 FeedTag 엔터티들의 배열
  //     const existingFeedTagIds = existingFeed.feedTag.map(feedTag => feedTag.id);
  //     //존재하지 않은 태그들 tagsToAdd 배열에 저장
  //     const tagsToAdd = savedTagIds.filter(tagId => !existingFeedTagIds.includes(tagId));
  //     //savedTagIds 배열에 존재하지 않는 태그들 tagsToDelete 배열에 저장
  //     const tagsToDelete = existingFeedTagIds.filter(feedTagId => !savedTagIds.includes(feedTagId));
  //   } catch (error) {
  //     console.log(error.message);
  //     throw new Error(error.message);
  //   }
  // }

  async createComment(loginUserId: number, feedId: number, content: string) {
    try {
      const newDate = new Date();
      const existingFeed = await this.feedRepository.findFeedById(feedId);
      if (!existingFeed) throw new Error('Feed does not exist');
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
