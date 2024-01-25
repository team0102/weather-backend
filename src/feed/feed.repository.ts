import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedEntity } from '../entities/feeds.entity';
import { Repository } from 'typeorm';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { FeedImageEntity } from 'src/entities/feedImages.entity';
import { FeedTagEntity } from 'src/entities/feedTags.entity';
import { UserEntity } from 'src/entities/users.entity';
import { WeatherConditionEntity } from 'src/entities/weatherCondition.entity';

@Injectable()
export class FeedRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
    @InjectRepository(FeedImageEntity)
    private readonly feedImageRepository: Repository<FeedImageEntity>,
    // @InjectRepository(UserEntity)
    // private readonly userRepository: Repository<UserEntity>,
    // @InjectRepository(WeatherConditionEntity)
    // private readonly weatherConditionRepository: Repository<WeatherConditionEntity>,
  ) {}

  async getFeedListWithDetails(loginUser: number): Promise<any[]> {
    const feedList = await this.feedRepository.query(
      `
      SELECT 
        f.id as feedId,
        u.id as authorId,
        u.nickName,
        u.profileImage,
        f.updatedAt,
        f.lowTemperature,
        f.highTemperature,
        fi.imageUrl,
        f.content,
        GROUP_CONCAT(DISTINCT t.content) AS feedTags,
        w.condition as weatherCondition,
        w.image as weatherConditionImage,
        (SELECT COUNT(*) FROM feed_likes WHERE feedId = f.id) as likeCount,
        (SELECT COUNT(*) FROM feed_comments WHERE feedId = f.id) as commentCount,
        (SELECT COUNT(*) FROM feed_likes WHERE feedId = f.id AND userId = ?) as isLiked,
        (SELECT COUNT(*) FROM bookmarks WHERE feedId = f.id AND userId = ?) as isBookmarked
      FROM feeds f
      LEFT JOIN users u ON f.userId = u.id
      LEFT JOIN weatherCondition w ON f.weatherConditionId = w.id
      LEFT JOIN feed_images fi ON f.id = fi.feedId
      LEFT JOIN feed_tags ft ON f.id = ft.feedId
      LEFT JOIN tags t ON ft.tagId = t.id
      WHERE f.deletedAt IS NULL
      GROUP BY f.id, u.id, fi.imageurl
      ORDER BY f.createdAt DESC
    `,
      [loginUser, loginUser],
    );

    console.log('feedList : ', feedList);
    return feedList;
  }

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
      user: { id: userId},
      weatherCondition: { id: weatherConditionId},
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
      feed: { id: savedFeed.id },
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
