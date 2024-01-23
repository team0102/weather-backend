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
  ) {}

  async createFeed(feedData: CreateFeedDTO, newDate: Date) {
    const {
      userId,
      weatherConditionId,
      highTemperature,
      lowTemperature,
      content,
      image,
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

    // 결과 반환
    const result = {
      feed: savedFeed,
      feedImage: savedFeedImage,
    };

    console.log('createFeed result : ', result);
    return result;
  }
}
