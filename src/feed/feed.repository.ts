import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedEntity } from '../entities/feeds.entity';
import {
  Repository,
  MoreThan,
  FindOptionsWhere,
  LessThan,
  Not,
  In,
  Equal,
} from 'typeorm';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { FeedImageEntity } from './../entities/feedImages.entity';
import { UpdateFeedDTO } from './dto/update-feed.dto';
import { PaginateFeedDto } from './dto/paginate-feed.dto';
import { UserBlockRepository } from './../user/userBlock.repository';
import { UserEntity } from './../entities/users.entity';
import { WeatherConditionEntity } from './../entities/weatherCondition.entity';
import { UserFollowRepository } from './../user/userFollow.repository';

@Injectable()
export class FeedRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
    @InjectRepository(FeedImageEntity)
    private readonly feedImageRepository: Repository<FeedImageEntity>,

    private readonly userBlockRepository: UserBlockRepository,
    private readonly userFollowRepository: UserFollowRepository,
  ) {}

  async getFeedListWithDetails(): Promise<FeedEntity[]> {
    const feedList = await this.feedRepository.find({
      relations: {
        user: true,
        feedImage: true,
        feedComment: {
          user: true,
        },
        feedLike: {
          user: true,
        },
        weatherCondition: true,
        bookmark: {
          user: true,
        },
        feedTag: {
          tag: true,
        },
      },
      order: { createdAt: 'DESC' },
      where: {
        deletedAt: null,
        user: {
          deletedAt: null,
        },
      },
    });
    return feedList;
  }

  async paginateFeedList(
    dto: PaginateFeedDto,
    userId: number,
  ): Promise<FeedEntity[]> {
    const where: FindOptionsWhere<FeedEntity> = {
      deletedAt: null,
      user: {
        deletedAt: null,
      },
    };

    // 차단한 유저 제외
    if (userId) {
      const blockUser =
        await this.userBlockRepository.findUserBlockList(userId);
      const blockedUserIds = blockUser.map((blockedUser) =>
        typeof blockedUser.blockUser === 'number'
          ? blockedUser.blockUser
          : blockedUser.blockUser.id,
      );
      const blockedUserWhere: FindOptionsWhere<UserEntity> = {
        id: Not(In(blockedUserIds)),
      };
      where.user = blockedUserWhere;
    }

    // 팔로우한 유저
    if (dto.followingUser && userId) {
      const followingUser =
        await this.userFollowRepository.findFollowingList(userId);
      const followedUserIds = followingUser.map((followUser) =>
        typeof followUser.followUser === 'number'
          ? followUser.followUser
          : followUser.followUser.id,
      );
      const followedUserWhere: FindOptionsWhere<UserEntity> = {
        id: In(followedUserIds),
      };
      where.user = followedUserWhere;
    }

    // 날씨 필터링
    if (dto.weatherConditonId) {
      const weatherConditonWhere: FindOptionsWhere<WeatherConditionEntity> = {
        id: Equal(dto.weatherConditonId),
      };
      where.weatherCondition = weatherConditonWhere;
    }

    // 페이지네이션
    if (dto.where__id__less_than) {
      where.id = LessThan(dto.where__id__less_than);
    } else if (dto.where__id__more_than) {
      where.id = MoreThan(dto.where__id__more_than);
    }

    const feeds = await this.feedRepository.find({
      relations: {
        user: true,
        feedImage: true,
        feedComment: {
          user: true,
        },
        feedLike: {
          user: true,
        },
        weatherCondition: true,
        bookmark: {
          user: true,
        },
        feedTag: {
          tag: true,
        },
      },
      where,
      order: {
        createdAt: dto.order__createdAt,
      },
      take: dto.take,
    });
    return feeds;
  }

  async getFeedWithDetailsById(feedId: number): Promise<FeedEntity> {
    const [feed] = await this.feedRepository.find({
      relations: {
        user: true,
        feedImage: true,
        feedComment: {
          user: true,
        },
        feedLike: {
          user: true,
        },
        weatherCondition: true,
        bookmark: {
          user: true,
        },
        feedTag: {
          tag: true,
        },
      },
      where: {
        id: feedId,
        user: {
          deletedAt: null,
        },
      },
    });
    console.log(feed);
    return feed;
  }

  async createFeed(
    userId: number,
    feedData: CreateFeedDTO,
    imageUrl: string,
  ): Promise<FeedEntity> {
    const { weatherConditionId } = feedData;
    const savedFeed = await this.feedRepository.save({
      user: { id: userId },
      weatherCondition: { id: weatherConditionId },
      ...feedData,
    });
    const savedFeedImage = await this.feedImageRepository.save({
      feed: savedFeed,
      imageUrl: imageUrl,
    });
    return savedFeed;
  }

  async deletedFeed(findFeed: FeedEntity): Promise<void> {
    const { feedImage } = findFeed;

    if (Array.isArray(feedImage) && feedImage.length > 0) {
      await Promise.all(
        feedImage.map(async (image) => {
          await this.feedImageRepository.softDelete(image.id);
        }),
      );
    }
    await this.feedRepository.softDelete({
      id: findFeed.id,
    });
  }

  async updateFeed(feedId: number, feedData: UpdateFeedDTO, imageUrl: string) {
    const { weatherConditionId, ...updateData } = feedData;
    if (weatherConditionId) {
      await this.feedRepository.update(
        { id: feedId },
        { weatherCondition: { id: weatherConditionId } },
      );
    }
    const updateFeed = await this.feedRepository.update(
      { id: feedId },
      { ...updateData },
    );
    // 이미지가 1개인 경우만 고려
    const updateFeedImage = await this.feedImageRepository.update(
      { feed: { id: feedId } },
      { imageUrl: imageUrl },
    );
    return updateFeed;
  }
}
