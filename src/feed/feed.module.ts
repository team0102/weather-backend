import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { FeedRepository } from './feed.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedImageEntity } from './../entities/feedImages.entity';
import { FeedTagEntity } from './../entities/feedTags.entity';
import { FeedEntity } from './../entities/feeds.entity';
import { FeedCommentEntity } from './../entities/feedComments.entity';
import { FeedLikeEntity } from './../entities/feedLikes.entity';
import { TagEntity } from './../entities/tags.entity';
import { TagRepository } from './tag.repository';
import { FeedTagRepository } from './feedTag.repository';
import { FeedCommentRepository } from './feedComment.repository';
import { TokenService } from './../utils/verifyToken';
import { BookmarkEntity } from './../entities/bookmarks.entity';
import { BookmarkRepository } from './bookmark.repository';
import { FeedLikeRepository } from './feedLike.repository';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import HttpError from './../utils/httpError';
import * as multer from 'multer';
import { v4 as uuid } from 'uuid';
import { FEED_IMAGE_PATH } from './../common/const/path.const';
import { CommonModule } from './../common/common.module';
import { UserBlockRepository } from './../user/userBlock.repository';
import { UserBlockEntity } from './../entities/userBlocks.entity';

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
      UserBlockEntity,
    ]),
    MulterModule.register({
      limits: {
        // 바이트 단위로 입력
        fileSize: 10000000, //10MB
      },
      fileFilter: (req, file, cb) => {
        /**
         * cb(에러, boolean)
         *
         * 첫번째 파라미터에는 에러가 있을 경우 에러 정보를 넣어준다.
         * 두번째 파라미터는 파일을 받을지 말지 boolean을 넣어준다.
         */
        // xxx.jpg -> .jpg
        const ext = extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
          return cb(new HttpError(403, 'Not in JPG, JPEG, PNG format'), false);
        }
        return cb(null, true);
      },
      storage: multer.diskStorage({
        destination: function (req, res, cb) {
          cb(null, FEED_IMAGE_PATH); // 저장 위치
        },
        filename: function (req, file, cb) {
          // uuid: 랜덤값 12310-24234-234
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
    CommonModule,
  ],
  controllers: [FeedController],
  providers: [
    FeedService,
    TokenService,
    FeedRepository,
    TagRepository,
    FeedTagRepository,
    FeedCommentRepository,
    FeedLikeRepository,
    BookmarkRepository,
    UserBlockRepository,
  ],
  exports: [TypeOrmModule],
})
export class FeedModule {}
