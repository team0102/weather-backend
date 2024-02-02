import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedEntity } from '../entities/feeds.entity';
import { Repository } from 'typeorm';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { FeedImageEntity } from 'src/entities/feedImages.entity';
import { UpdateFeedDTO } from './dto/update-feed.dto';

@Injectable()
export class FeedRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
    @InjectRepository(FeedImageEntity)
    private readonly feedImageRepository: Repository<FeedImageEntity>,
  ) {}

  async getFeedListWithDetails(): Promise<FeedEntity[]> {
    try {
      const feedList = await this.feedRepository.find({
        relations: {
          user: true,
          feedImage: true,
          feedComment: true,
          feedLike: true,
          bookmark: true,
          feedTag: {
            tag: true,
          },
        },
      });
      return feedList;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async getFeedWithDetailsById(feedId: number) {
    try {
      const [feed] = await this.feedRepository.find({
        relations: {
          user: true,
          feedComment: true,
          feedLike: true,
          bookmark: true,
          feedTag: {
            tag: true,
          },
        },
        where: { id: feedId },
      });
      return feed;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async createFeed(userId: number, feedData: CreateFeedDTO): Promise<FeedEntity> {
    try {
      const {
        weatherConditionId,
        imageUrl,
      } = feedData;
      //피드 저장 및 연결
      const savedFeed = await this.feedRepository.save({
        user: { id: userId },
        weatherCondition: { id: weatherConditionId },
        ...feedData,
      });
      // 이미지 저장 및 연결
      const savedFeedImage = await this.feedImageRepository.save({
        feed: savedFeed,
        imageUrl: imageUrl,
      });
      console.log('createFeed savedFeed : ', savedFeed, savedFeedImage);
      return savedFeed;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  //=======================================update feed =============================
  // async updateFeed(userId: number, feedData: UpdateFeedDTO, newDate: Date) {
  //   try {
  //     const {
  //       weatherConditionId,
  //       highTemperature,
  //       lowTemperature,
  //       content,
  //       image,
  //     } = feedData;

  //     //피드 저장 및 연결
  //     const savedFeed = await this.feedRepository.save({
  //       user: { id: userId },
  //       weatherCondition: { id: weatherConditionId },
  //       highTemperature,
  //       lowTemperature,
  //       content,
  //       createdAt: newDate,
  //       updatedAt: newDate,
  //     });

  //     // 이미지 저장 및 연결
  //     const savedFeedImage = await this.feedImageRepository.save({
  //       imageUrl: image,
  //       createdAt: newDate,
  //       updatedAt: newDate,
  //       feed: { id: savedFeed.id },
  //     });

  //     // 결과 반환
  //     const result = {
  //       feed: savedFeed,
  //       feedImage: savedFeedImage,
  //     };
  //     console.log('createFeed result : ', result);
  //     return result;
  //   } catch (error) {
  //     console.log(error.message);
  //     throw new Error(error.message);
  //   }
  // }

  async findFeedById(feedId: number) {
    try {
      const result = await this.feedRepository.findOneBy({ id: feedId });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
