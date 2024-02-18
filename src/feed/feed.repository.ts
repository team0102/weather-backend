import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedEntity } from '../entities/feeds.entity';
import { Repository, Not, MoreThan } from 'typeorm';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { FeedImageEntity } from 'src/entities/feedImages.entity';
import { UpdateFeedDTO } from './dto/update-feed.dto';
import { PaginateFeedDto } from './dto/paginate-feed.dto';

@Injectable()
export class FeedRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
    @InjectRepository(FeedImageEntity)
    private readonly feedImageRepository: Repository<FeedImageEntity>,
  ) {}

  async getFeedListWithDetails(): Promise<FeedEntity[]> {
    const feedList = await this.feedRepository.find({
      relations: {
        user: true,
        feedImage: true,
        feedComment: {
          user:true,
        },
        feedLike: {
          user : true
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
    console.log(feedList);
    return feedList;
  }

  async paginateFeedList(dto: PaginateFeedDto): Promise<FeedEntity[]> {
    const feeds = await this.feedRepository.find({
      where: {
       // id: MoreThan(dto.where__id_more_than),
        id: dto.where__id_more_than ? MoreThan(dto.where__id_more_than) : undefined,
      },
      order: {
        createdAt: dto.order__createdAt,
      },
      take: dto.take,
    });
    console.log(feeds)

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
  ): Promise<FeedEntity> {
    const { weatherConditionId, imageUrl } = feedData;
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

  async updateFeed(feedId: number, feedData: UpdateFeedDTO) {
    const { weatherConditionId, imageUrl, ...updateData } = feedData;
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

  // ==================생략 예정===================
  // async findFeedById(feedId: number): Promise<FeedEntity> {
  //     const result = await this.feedRepository.findOne({
  //       where: {
  //         id: feedId,
  //         user: {
  //           deletedAt: null,
  //         },
  //       },
  //       relations: ['user', 'feedTag', 'feedImage', 'bookmark'],
  //     });
  //     return result;
  //   }
  // }
}
