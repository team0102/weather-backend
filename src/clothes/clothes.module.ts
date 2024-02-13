import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothEntity } from 'src/entities/clothes.entity';
import { UserEntity } from 'src/entities/users.entity';
import { TokenService } from 'src/utils/verifyToken';
import { ClothesRepository } from './clothes.repository';
import { UserRepository } from 'src/user/user.repository';
import { FeedService } from 'src/feed/feed.service';
import { FeedRepository } from 'src/feed/feed.repository';
import { TagRepository } from 'src/feed/tag.repository';
import { FeedTagRepository } from 'src/feed/feedTag.repository';
import { FeedCommentRepository } from 'src/feed/feedComment.repository';
import { FeedLikeRepository } from 'src/feed/feedLike.repository';
import { BookmarkRepository } from 'src/feed/bookmark.repository';
import { FeedEntity } from 'src/entities/feeds.entity';
import { FeedImageEntity } from 'src/entities/feedImages.entity';
import { TagEntity } from 'src/entities/tags.entity';
import { FeedTagEntity } from 'src/entities/feedTags.entity';
import { FeedCommentEntity } from 'src/entities/feedComments.entity';
import { FeedLikeEntity } from 'src/entities/feedLikes.entity';
import { BookmarkEntity } from 'src/entities/bookmarks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClothEntity,
      UserEntity,
      FeedEntity,
      FeedImageEntity,
      TagEntity,
      FeedTagEntity,
      FeedCommentEntity,
      FeedLikeEntity,
      BookmarkEntity,
    ]),
  ],
  controllers: [ClothesController],
  providers: [
    ClothesService,
    TokenService,
    ClothesRepository,
    UserRepository,
    FeedService,
    FeedRepository,
    TagRepository,
    FeedTagRepository,
    FeedCommentRepository,
    FeedLikeRepository,
    BookmarkRepository,
  ],
})
export class ClothesModule {}
