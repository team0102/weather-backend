import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { FeedRepository } from './feed.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedImageEntity } from 'src/entities/feedImages.entity';
import { FeedTagEntity } from 'src/entities/feedTags.entity';
import { FeedEntity } from 'src/entities/feeds.entity';
import { FeedCommentEntity } from 'src/entities/feedComments.entity';
import { FeedLikeEntity } from 'src/entities/feedLikes.entity';
import { TagEntity } from 'src/entities/tags.entity';
import { UserEntity } from 'src/entities/users.entity';
import { WeatherConditionEntity } from 'src/entities/weatherCondition.entity';
import { TagRepository } from './tag.repository';
import { FeedTagRepository } from './feedTag.repository';
import { FeedCommentRepository } from './feedComment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      //forRoot 와이 차이점은?
      FeedEntity,
      FeedImageEntity,
      FeedTagEntity,
      FeedCommentEntity,
      FeedLikeEntity,
      TagEntity,
      //WeatherConditionEntity
    ]),
  ],
  controllers: [FeedController],
  providers: [
    FeedService,
    FeedRepository,
    TagRepository,
    FeedTagRepository,
    FeedCommentRepository,
  ],
  exports: [TypeOrmModule],
})
export class FeedModule {}