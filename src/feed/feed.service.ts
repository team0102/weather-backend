import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { TagRepository } from './tag.repository';
import { FeedTagRepository } from './feedTag.repository';
import { DataSource } from 'typeorm';
import { FeedCommentRepository } from './feedComment.repository';
import { UpdateFeedDTO } from './dto/update-feed.dto';
import { BookmarkList, FeedDatail, FeedList, FeedListItem } from './feed.types';
import { BookmarkRepository } from './bookmark.repository';
import { FeedLikeRepository } from './feedLike.repository';
import HttpError from './../utils/httpError';
import {
  FEED_PUBLIC_IMAGE_PATH,
  FEED_PUBLIC_IMAGE_URL,
} from './../common/const/path.const';
import * as fs from 'fs';
import { join } from 'path';
import { PaginateFeedDto } from './dto/paginate-feed.dto';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly tagRepository: TagRepository,
    private readonly feedTagRepository: FeedTagRepository,
    private readonly feedCommentRepository: FeedCommentRepository,
    private readonly feedLikeRepository: FeedLikeRepository,
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly dataSource: DataSource,
  ) {}

  async getFeedList(userId: number | null): Promise<FeedListItem[]> {
    const feedList = await this.feedRepository.getFeedListWithDetails();
    const processedFeedList = await Promise.all(
      feedList
        .filter((feed) => feed.user !== null)
        .map(async (feed) => {
          const isAuthor = userId && feed.user.id === userId;
          const likeCount = feed.feedLike.length;
          const commentCount = feed.feedComment.length;
          const isLiked = feed.feedLike.some(
            (like) => like.user && like.user.id === userId,
          );
          const isBookmarked = feed.bookmark.some(
            (bookmark) => bookmark.user && bookmark.user.id === userId,
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
            imageUrl: `${FEED_PUBLIC_IMAGE_URL}/${imageUrl}`,
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
  }

  async getFeedListWithPagination(
    dto: PaginateFeedDto,
    userId: number | null,
  ): Promise<FeedList> {
    const feedList = await this.feedRepository.paginateFeedList(dto, userId);
    const lastItem =
      feedList.length > 0 && feedList.length >= dto.take
        ? feedList[feedList.length - 1]
        : null;
    const nextUrl = lastItem && new URL(`${process.env.WEATHER_URL}/feeds`);
    if (nextUrl) {
      /* 
       dto의 key에 대한 value가 존재하면 param에 그대로 붙여넣는다.
       단, where__id_more_than 값만 lastItem의 마지막 값으로 넣어준다.
       */
      for (const key of Object.keys(dto)) {
        if (dto[key]) {
          if (
            key !== 'where__id__more_than' &&
            key !== 'where__id__less_than'
          ) {
            // 해당 값이 없으면 제외
            nextUrl.searchParams.append(key, dto[key]);
          }
        }
      };
      let key = null;
      if (dto.order__createdAt === 'ASC') {
        key = 'where__id__more_than';
      } else {
        key = 'where__id__less_than';
      }
      nextUrl.searchParams.append(key, lastItem.id.toString());
    }

    const processedFeedList = await Promise.all(
      feedList
        .filter((feed) => feed.user !== null)
        .map(async (feed) => {
          const isAuthor = userId && feed.user.id === userId;
          const likeCount = feed.feedLike.length;
          const commentCount = feed.feedComment.length;
          const isLiked = feed.feedLike.some(
            (like) => like.user && like.user.id === userId,
          );
          const isBookmarked = feed.bookmark.some(
            (bookmark) => bookmark.user && bookmark.user.id === userId,
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
            imageUrl: `${FEED_PUBLIC_IMAGE_URL}/${imageUrl}`,
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

    return {
      feeds: processedFeedList, // Data[]
      cursor: {
        after: lastItem?.id ?? null, // 마지막 Data의 Id
      },
      count: feedList?.length, // 응답할 데이터의 개수
      next: nextUrl?.toString() ?? null, // 다음 요청을 할 때 사용할 URL
    };
  }

  async getFeedDetails(userId: number, feedId: number): Promise<FeedDatail> {
    const feedDetails =
      await this.feedRepository.getFeedWithDetailsById(feedId);
    if (!feedDetails || feedDetails.deletedAt || !feedDetails.user)
      throw new HttpError(404, 'Feed does not exist');
    const isAuthor = feedDetails.user && feedDetails.user.id === userId;
    const likeCount = feedDetails.feedLike.length;
    const commentCount = feedDetails.feedComment.length;
    const isLiked = feedDetails.feedLike.some(
      (like) => like.user && like.user.id === userId,
    );
    const isBookmarked = feedDetails.bookmark.some(
      (bookmark) => bookmark.user && bookmark.user.id === userId,
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
      // 댓글 작성자가 존재하지 않으면 기본값을 사용
      author: comment.user
        ? {
            id: comment.user.id,
            nickname: comment.user.nickname,
            profileImage: comment.user.profileImage,
          }
        : null,
    }));

    const processedFeed = {
      id: feedDetails.id,
      imageUrl: `${FEED_PUBLIC_IMAGE_URL}/${imageUrl}`,
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
  }

  async createFeed(
    loginUserId: number,
    feedData: CreateFeedDTO,
    imageUrl: string,
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
        imageUrl,
      );
      const savedFeedId = savedFeed.id;
      const savedTagIds = await this.saveTagsAndGetIds(tags);
      const savedFeedTag = await this.feedTagRepository.createFeedTags(
        savedFeedId,
        savedTagIds,
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateFeed(
    loginUserId: number,
    feedId: number,
    feedData: UpdateFeedDTO,
    imageUrl: string,
  ) {
    const { content } = feedData;
    const tags = this.extractTagsFromContent(content);
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // 기존 피드 정보 가져오기
      const existingFeed =
        await this.feedRepository.getFeedWithDetailsById(feedId);
      // 존재하지 않은 피드, 삭제된 피드 에러핸들링
      if (!existingFeed || existingFeed.deletedAt || !existingFeed.user)
        throw new HttpError(404, 'Feed does not exist');
      // 로그인유저=작성자 아닌 경우 에러핸들링
      if (existingFeed.user.id !== loginUserId)
        throw new HttpError(403, 'Invalid user');

      // 기존 이미지 파일
      const previousImage = existingFeed.feedImage[0].imageUrl;
      // 피드, 피드 이미지 업데이트
      const updateFeed = await this.feedRepository.updateFeed(
        feedId,
        feedData,
        imageUrl,
      );
      // 기존 이미지 파일 삭제
      fs.unlinkSync(join(FEED_PUBLIC_IMAGE_PATH, previousImage));

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
      await this.feedTagRepository.createFeedTags(feedId, tagsToAdd);
      // 삭제된 feedTags 삭제
      await this.feedTagRepository.deleteFeedTags(feedTagsToDelete);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw error;
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
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const findFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
      if (!findFeed || findFeed.deletedAt || !findFeed.user)
        throw new HttpError(404, 'Feed does not exist');
      if (!findFeed.user || findFeed.user.id !== loginUserId)
        throw new HttpError(403, 'Invalid User');
      // 피드 이미지 파일
      const previousImage = findFeed.feedImage[0].imageUrl;
      // 피드 이미지 파일 삭제
      fs.unlinkSync(join(FEED_PUBLIC_IMAGE_PATH, previousImage));
      // feedTag들 delete
      if (findFeed.feedTag) {
        findFeed.feedTag.forEach(async (feedTag) => {
          const deleteFeedTagIds: number[] = [];
          deleteFeedTagIds.push(feedTag.id);
          await this.feedTagRepository.deleteFeedTags(deleteFeedTagIds);
        });
      }
      //feedLike들 delete
      if (findFeed.feedLike) {
        findFeed.feedLike.forEach(async (feedLike) => {
          const deledtedFeedLikeIds: number[] = [];
          deledtedFeedLikeIds.push(feedLike.id);
          await this.feedLikeRepository.deleteFeedLikesByIds(
            deledtedFeedLikeIds,
          );
        });
      }
      // bookmark는 delete
      if (findFeed.bookmark) {
        findFeed.bookmark.forEach(async (bookmark) => {
          await this.bookmarkRepository.deleteBookmark(bookmark.id);
        });
      }
      // feedComment는 softDelete
      if (findFeed.feedComment) {
        findFeed.feedComment.forEach(async (comment) => {
          await this.feedCommentRepository.deleteFeedComment(comment.id);
        });
      }
      await this.feedRepository.deletedFeed(findFeed);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async createFeedComment(
    loginUserId: number,
    feedId: number,
    content: string,
  ): Promise<void> {
    const existingFeed =
      await this.feedRepository.getFeedWithDetailsById(feedId);
    if (!existingFeed || existingFeed.deletedAt || !existingFeed.user)
      throw new HttpError(404, 'Feed does not exist');
    await this.feedCommentRepository.createFeedComment(
      loginUserId,
      feedId,
      content,
    );
  }

  async updateFeedComment(
    loginUserId: number,
    feedId: number,
    commentId: number,
    content: string,
  ): Promise<void> {
    const existingFeed =
      await this.feedRepository.getFeedWithDetailsById(feedId);
    if (!existingFeed || existingFeed.deletedAt || !existingFeed.user)
      throw new HttpError(404, 'Feed does not exist');
    const existingFeedComment =
      await this.feedCommentRepository.getFeedCommentById(commentId);
    if (
      !existingFeedComment ||
      existingFeedComment.deletedAt ||
      !existingFeedComment.user
    )
      throw new HttpError(404, 'Comment does not exist');
    if (existingFeedComment.user.id !== loginUserId)
      throw new HttpError(403, 'Invalid User');
    await this.feedCommentRepository.updateFeedComment(commentId, content);
  }

  async deleteFeedComment(
    loginUserId: number,
    feedId: number,
    commentId: number,
  ): Promise<void> {
    const existingFeedComment =
      await this.feedCommentRepository.getFeedCommentById(commentId);
    if (!existingFeedComment)
      throw new HttpError(404, 'Comment does not exist');
    if (existingFeedComment.user.id !== loginUserId)
      throw new HttpError(403, 'Invalid User');
    const existingFeed =
      await this.feedRepository.getFeedWithDetailsById(feedId);
    if (!existingFeed || existingFeed.deletedAt || !existingFeed.user)
      throw new HttpError(404, 'Feed does not exist');
    await this.feedCommentRepository.deleteFeedComment(commentId);
  }

  // 북마크 상태 변경 api : 미사용중
  async handleBookmark(
    loginUserId: number,
    feedId: number,
    isBookmarked: boolean,
  ): Promise<void> {
    const findFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
    if (!findFeed || findFeed.deletedAt || !findFeed.user)
      throw new HttpError(404, 'Feed does not exist');
    // 북마크를 누르지 않은 상태에서 요청이 오면 북마크 추가
    if (isBookmarked) {
      const findBookmark = await this.bookmarkRepository.isBookmarked(
        loginUserId,
        feedId,
      );
      if (!findBookmark) {
        // isBookmarked가 true findBookmark 존재하지 않으면 잘못된 요청
        throw new HttpError(400, 'Invalid request');
      }
      await this.bookmarkRepository.deleteBookmark(findBookmark.id);
    } else {
      //이미 북마크를 누른 상태에서 요청이 오면 북마크 취소
      const existingBookmarked = await this.bookmarkRepository.isBookmarked(
        loginUserId,
        feedId,
      );
      if (existingBookmarked) {
        // isBookmarked가 false인데 existingBookmarked 존재하면 잘못된 요청
        throw new HttpError(400, 'Invalid request');
      }
      await this.bookmarkRepository.createBookmark(loginUserId, feedId);
    }
  }

  async createBookmark(loginUserId: number, feedId: number): Promise<void> {
    const findFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
    if (!findFeed || findFeed.deletedAt || !findFeed.user)
      throw new HttpError(404, 'Feed does not exist');
    const isBookmarked = await this.bookmarkRepository.isBookmarked(
      loginUserId,
      feedId,
    );
    if (isBookmarked) throw new HttpError(400, 'Feed already bookmarked');
    await this.bookmarkRepository.createBookmark(loginUserId, feedId);
  }

  async deleteBookmark(loginUserId: number, feedId: number): Promise<void> {
    const findFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
    if (!findFeed || findFeed.deletedAt || !findFeed.user)
      throw new HttpError(404, 'Feed does not exist');
    const isBookmarked = await this.bookmarkRepository.isBookmarked(
      loginUserId,
      feedId,
    );
    if (!isBookmarked) throw new HttpError(404, 'Bookmark does not exist');
    await this.bookmarkRepository.deleteBookmark(isBookmarked.id);
  }

  async getBookmarkList(loginUserId: number): Promise<BookmarkList[]> {
    const bookmarkList =
      await this.bookmarkRepository.getBookmarkList(loginUserId);
    const filteredBookmarkList = bookmarkList.filter((bookmark) => {
      return bookmark.feed !== null && bookmark.user !== null;
    });
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
            imageUrl: `${FEED_PUBLIC_IMAGE_URL}/${imageUrl}`,
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
  }

  async handleFeedLike(isLiked: boolean, loginUserId: number, feedId: number) {
    // 존재하는 피드인지, 삭제되지 않은 피드인지, 작성자가 탈퇴하지 않았는지 에러 핸들링
    const findFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
    if (!findFeed || findFeed.deletedAt || !findFeed.user)
      throw new HttpError(404, 'Feed does not exist');

    // 좋아요를 누르지 않은 상태(isLike = false)에서 요청이 오면 좋아요 생성
    if (isLiked) {
      // 좋아요를 취소하는 경우
      const findFeedLike =
        await this.feedLikeRepository.findFeedLikeByFeedIdAndUserId(
          loginUserId,
          feedId,
        );
      if (!findFeedLike) {
        // isLiked가 true인데 findFeedLike가 존재하지 않으면 잘못된 요청
        throw new HttpError(400, 'Invalid request');
      }
      await this.feedLikeRepository.deleteFeedLike(findFeedLike.id);
    } else {
      // 좋아요를 생성하는 경우
      const existingFeedLike =
        await this.feedLikeRepository.findFeedLikeByFeedIdAndUserId(
          loginUserId,
          feedId,
        );
      if (existingFeedLike) {
        // isLiked가 false인데 findFeedLike가 이미 존재하면 잘못된 요청
        throw new HttpError(400, 'Invalid request');
      }
      await this.feedLikeRepository.createFeedLike(loginUserId, feedId);
    }
  }
}
