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
    try {
      const findBookmark = await this.bookmarkRepository.findOne({
        where: {
          user: { id: userId },
          feed: { id: feedId },
        },
      });
      return findBookmark;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async createBookmark(
    userId: number,
    feedId: number,
  ): Promise<BookmarkEntity> {
    try {
      const result = await this.bookmarkRepository.save({
        user: { id: userId },
        feed: { id: feedId },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async getBookmarkList(userId: number):Promise<BookmarkEntity[]> {
    try {
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
          },
          user: {
            id: userId,
          },
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
