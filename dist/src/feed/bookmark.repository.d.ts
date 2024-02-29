import { BookmarkEntity } from 'src/entities/bookmarks.entity';
import { Repository } from 'typeorm';
export declare class BookmarkRepository {
    private readonly bookmarkRepository;
    constructor(bookmarkRepository: Repository<BookmarkEntity>);
    isBookmarked(userId: number, feedId: number): Promise<BookmarkEntity>;
    createBookmark(userId: number, feedId: number): Promise<BookmarkEntity>;
    deleteBookmark(id: number): Promise<void>;
    getBookmarkList(userId: number): Promise<BookmarkEntity[]>;
}
