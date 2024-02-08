import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { TagRepository } from './tag.repository';
import { FeedTagRepository } from './feedTag.repository';
import { DataSource } from 'typeorm';
import { FeedCommentRepository } from './feedComment.repository';
import { UpdateFeedDTO } from './dto/update-feed.dto';
import { BookmarkList, FeedDatail, FeedListItem } from './feed.types';
import { BookmarkRepository } from './bookmark.repository';
import { FeedImageRepository } from './feedImage.repository';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly tagRepository: TagRepository,
    private readonly feedTagRepository: FeedTagRepository,
    private readonly feedCommentRepository: FeedCommentRepository,
    private readonly feedImageRepository: FeedImageRepository,
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly dataSource: DataSource,
  ) {}

  async getFeedList(userId: number | null): Promise<FeedListItem[]> {
    try {
      const feedList = await this.feedRepository.getFeedListWithDetails();
      const processedFeedList = await Promise.all(
        feedList
        .filter(feed => feed.user !== null)
        .map(async (feed) => {
          const isAuthor = userId !== null && feed.user.id === userId;
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
      console.log(error);
      throw new Error('Fail to get feedList');
    }
  }

  async getFeedDetails(userId: number, feedId: number): Promise<FeedDatail> {
    try {
      const feedDetails =
        await this.feedRepository.getFeedWithDetailsById(feedId);
      if (!feedDetails || feedDetails.deletedAt)
        throw new Error('Feed does not exist');
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
        deletedAt: comment.deletedAt,
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
      console.log(error);
      throw new Error('Fail to get feedDetails');
    }
  }

  async createFeed(
    loginUserId: number,
    feedData: CreateFeedDTO,
  ): Promise<void> {
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
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      throw new Error('Fail to create feed');
    } finally {
      await queryRunner.release();
    }
  }

  async updateFeed(
    loginUserId: number,
    feedId: number,
    feedData: UpdateFeedDTO,
  ) {
    const { content } = feedData;
    const tags = this.extractTagsFromContent(content);
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // 기존 피드 정보 가져오기
      const existingFeed = await this.feedRepository.findFeedById(feedId);
      // 존재하지 않은 피드, 삭제된 피드 에러핸들링
      if (!existingFeed || existingFeed.deletedAt)
        throw new Error('Feed does not exist');
      // 로그인유저=작성자 아닌 경우 에러핸들링
      if (existingFeed.user.id !== loginUserId) throw new Error('Invalid user');
      // 피드, 피드 이미지 업데이트
      const updateFeed = await this.feedRepository.updateFeed(feedId, feedData);
      // 존재하는 태그 id, 추가된 태그 id 배열
      const savedTagIds = await this.saveTagsAndGetIds(tags);
      // 기존 피드가 가지고 있던 FeedTag 엔터티들의 배열
      const existingFeedTagIds =
        existingFeed.feedTag?.map((feedTag) => feedTag.id) || [];
      // 존재하지 않은 태그들 tagsToAdd 배열에 저장
      const tagsToAdd = savedTagIds.filter(
        (tagId) => !existingFeedTagIds.includes(tagId),
      );
      // savedTagIds 배열에 존재하지 않는 태그들 tagsToDelete 배열에 저장
      const feedTagsToDelete = existingFeedTagIds.filter(
        (feedTagId) => !savedTagIds.includes(feedTagId),
      );
      // 새로 생성된 tags를 feedTags 추가
      await this.feedTagRepository.createFeedTags(
        feedId,
        tagsToAdd,
        queryRunner,
      );
      // 삭제된 feedTags 삭제
      await this.feedTagRepository.deletedFeedTags(
        feedTagsToDelete,
        queryRunner,
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new Error('Fail to update feed');
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

  async deleteFeed(loginUserId: number, feedId: number): Promise<void> {
    try {
      const newDate = new Date();
      const findFeed = await this.feedRepository.findFeedById(feedId);
      if (!findFeed || findFeed.deletedAt)
        throw new Error('Feed does not exist');
      //console.log('findFeed:', findFeed);
      if (!findFeed.user || findFeed.user.id !== loginUserId)
        throw new Error('Invalid User');

        // if (findFeed.feedTag) {
        //   // feedTag는 삭제
        //   findFeed.feedTag.forEach(async (tag) => {
        //     tag.deletedAt = newDate;
        //     await this.feedTagRepository.save(tag);
        //   });
        // }
    
        if (findFeed.feedImage) {
          // feedImage는 softDelete
          findFeed.feedImage.forEach(async (image) => {
            image.deletedAt = newDate;
            await this.feedImageRepository.updateFeedImage(image);
          });
        }
    
        if (findFeed.feedComment) {
          // feedComment는 softDelete
          findFeed.feedComment.forEach(async (comment) => {
            comment.deletedAt = newDate;
            await this.feedCommentRepository.updateFeedComment(comment);
          });
        }

      await this.feedRepository.deletedFeed(feedId, newDate);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async createComment(
    loginUserId: number,
    feedId: number,
    content: string,
  ): Promise<void> {
    try {
      const existingFeed = await this.feedRepository.findFeedById(feedId);
      if (!existingFeed) throw new Error('Feed does not exist');
      await this.feedCommentRepository.createComment(
        loginUserId,
        feedId,
        content,
      );
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async createBookmark(loginUserId: number, feedId: number): Promise<void> {
    try {
      const findFeed = await this.feedRepository.findFeedById(feedId);
      if (!findFeed || findFeed.deletedAt)
        throw new Error('Feed does not exist');
      const isBookmarked = await this.bookmarkRepository.isBookmarked(
        loginUserId,
        feedId,
      );
      if (isBookmarked) throw new Error('Feed already bookmarked');
      await this.bookmarkRepository.createBookmark(loginUserId, feedId);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async getBookmarkList(loginUserId: number):Promise<BookmarkList[]> {
    try {
      const bookmarkList =
        await this.bookmarkRepository.getBookmarkList(loginUserId);
      //삭제된 피드 제외
      const filteredBookmarkList = bookmarkList.filter(
        (bookmark) => bookmark.feed !== null,
      );
      const processedBookmarkList = await Promise.all(
        filteredBookmarkList.map(async (bookmark) => {
          const { content, lowTemperature, highTemperature, weatherCondition } =
            bookmark.feed;
          const { nickname, profileImage } = bookmark.feed.user;
          const imageUrl =
            bookmark.feed.feedImage.length > 0
              ? bookmark.feed.feedImage[0].imageUrl
              : null;

          return {
            id: bookmark.id,
            createdAt: bookmark.createdAt,
            feed: {
              id: bookmark.feed.id,
              imageUrl,
              content,
              lowTemperature,
              highTemperature,
              weatherConditionId: weatherCondition.id,
              createdAt: bookmark.feed.createdAt,
              updatedAt: bookmark.feed.updatedAt,
            },
            author: { id: bookmark.feed.user.id, nickname, profileImage },
          };
        }),
      );
      return processedBookmarkList;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
