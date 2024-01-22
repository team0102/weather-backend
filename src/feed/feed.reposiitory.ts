import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedEntity } from '../entities/feeds.entity';
import { Repository } from 'typeorm';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { FeedImageEntity } from 'src/entities/feedImages.entity';
import { FeedTagEntity } from 'src/entities/feedTags.entity';

@Injectable()
export class FeedRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
    @InjectRepository(FeedImageEntity)
    private readonly feedImageRepository: Repository<FeedImageEntity>,
    @InjectRepository(FeedTagEntity)
    private readonly feedTagRepository: Repository<FeedTagEntity>,
  ) {}

  async createFeed(feedData: CreateFeedDTO, newDate: Date) {
    const {
      userId,
      weatherConditionId,
      highTemperature,
      lowTemperature,
      content,
      image,
      tag,
    } = feedData;
 
    //피드 저장
    const savedFeed = await this.feedRepository.save({
      userId,
      weatherConditionId,
      highTemperature,
      lowTemperature,
      content,
      createdAt: newDate,
      updatedAt: newDate,
    });

    // 이미지 저장 및 연결
    const savedFeedImage = await this.feedImageRepository.save({
      imageUrl: image,
      createdAt: newDate,
      updatedAt: newDate,
      feed: savedFeed, // 피드 이미지에 저장된 피드 엔티티 연결
    });

    // 태그 저장 및 연결
    const savedFeedTags = await Promise.all(
      tag.map(async (tagValue) => {
        const savedFeedTag = await this.feedTagRepository.save({
          name: tagValue,
          createdAt: newDate,
          updatedAt: newDate,
        });

        // 피드 태그에 피드 엔티티와 태그 엔티티 연결
        await this.feedTagRepository.save({
          feed: savedFeed,
          tag: savedFeedTag,
        });
      }),
    );

    // 결과 반환
    const result = {
      feed: savedFeed,
      feedImage: savedFeedImage,
      feedTags: savedFeedTags,
    };

    // const result = await this.feedRepository.query(
    //   `INSERT INTO feeds (
    //         userId,
    //         content,
    //         lowTemperature,
    //         highTemperature,
    //         weatherConditionid,
    //         createdAt,
    //         updatedAt
    //     ) VALUES (
    //         ?, ?, ?, ?, ?, ?, ?
    //     )`,
    //   [
    //     userId,
    //     content,
    //     lowTemperature,
    //     highTemperature,
    //     weatherConditionId,
    //     newDate,
    //     newDate
    //   ],
    // );

    console.log('result : ', result);
    return result;
  }
}
