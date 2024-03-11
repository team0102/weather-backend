import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarkEntity } from 'src/entities/bookmarks.entity';
import { FeedEntity } from 'src/entities/feeds.entity';
import { UserEntity } from 'src/entities/users.entity';
import { UserBlockRepository } from 'src/user/userBlock.repository';
import { FindOptionsWhere, In, Not, Repository } from 'typeorm';

@Injectable()
export class BookmarkRepository {
  constructor(
    @InjectRepository(BookmarkEntity)
    private readonly bookmarkRepository: Repository<BookmarkEntity>,

    private readonly userBlockRepository: UserBlockRepository,
  ) {}

  async isBookmarked(userId: number, feedId: number): Promise<BookmarkEntity> {
    const findBookmark = await this.bookmarkRepository.findOne({
      where: {
        user: { id: userId },
        feed: { id: feedId },
      },
    });
    return findBookmark;
  }

  async createBookmark(
    userId: number,
    feedId: number,
  ): Promise<BookmarkEntity> {
    const result = await this.bookmarkRepository.save({
      user: { id: userId },
      feed: { id: feedId },
    });
    return result;
  }

  async deleteBookmark(id: number): Promise<void> {
    const result = await this.bookmarkRepository.delete({ id });
    console.log(result);
  }

  async getBookmarkList(userId: number): Promise<BookmarkEntity[]> {
    const where: FindOptionsWhere<FeedEntity> = {
      deletedAt: null,
      user: {
        id: userId,
        deletedAt: null,
      },
    };

    const blockUser = await this.userBlockRepository.findUserBlockList(userId);
    const blockedUserIds = blockUser.map((blockedUser) =>
      typeof blockedUser.blockUser === 'number'
        ? blockedUser.blockUser
        : blockedUser.blockUser.id,
    );
    const blockedUserWhere: FindOptionsWhere<UserEntity> = {
      id: Not(In(blockedUserIds)),
    };
    where.user = blockedUserWhere;

    const result = await this.bookmarkRepository.find({
      relations: {
        feed: {
          user: true,
          feedImage: true,
          weatherCondition: true,
        },
      },
      order: { createdAt: 'DESC' },
      where,
    });
    return result;
  }
}
