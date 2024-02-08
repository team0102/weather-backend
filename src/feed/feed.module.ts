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
import { TagRepository } from './tag.repository';
import { FeedTagRepository } from './feedTag.repository';
import { FeedCommentRepository } from './feedComment.repository';
import { TokenService } from 'src/utils/verifyToken';
import { BookmarkEntity } from 'src/entities/bookmarks.entity';
import { BookmarkRepository } from './bookmark.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FeedEntity,
      FeedImageEntity,
      FeedTagEntity,
      FeedCommentEntity,
      FeedLikeEntity,
      TagEntity,
      BookmarkEntity,
    ]),
  ],
  controllers: [FeedController],
  providers: [
    FeedService,
    TokenService,
    FeedRepository,
    TagRepository,
    FeedTagRepository,
    FeedCommentRepository,
    BookmarkRepository,
  ],
  exports: [TypeOrmModule],
})
export class FeedModule {}
