import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarkEntity } from 'src/entities/bookmarks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarkRepository {
  constructor(
    @InjectRepository(BookmarkEntity)
    private readonly bookmarkRepository: Repository<BookmarkEntity>,
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
  };

  async deleteBookmark(id: number): Promise<void> {
      const result = await this.bookmarkRepository.delete({ id });
      //console.log(result)
  };

  async getBookmarkList(userId: number): Promise<BookmarkEntity[]> {
      const result = await this.bookmarkRepository.find({
        relations: {
          feed: {
            user: true,
            feedImage: true,
            weatherCondition: true,
          },
        },
        order: { createdAt: 'DESC' },
        where: {
          feed: {
            deletedAt: null,
            user: {
              deletedAt: null,
            },
          },
          user: {
            id: userId,
          },
        },
      });
      return result;
  }
}
