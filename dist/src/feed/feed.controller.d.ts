import { FeedService } from './feed.service';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { TokenService } from 'src/utils/verifyToken';
import { UpdateFeedDTO } from './dto/update-feed.dto';
import { ApiResponse, BookmarkListResponse, FeedDetailResponse, FeedListResponse } from './feed.types';
export declare class FeedController {
    private readonly feedService;
    private readonly tokenService;
    constructor(feedService: FeedService, tokenService: TokenService);
    getFeedList(token: string | undefined): Promise<FeedListResponse>;
    getBookmarkList(token: string): Promise<BookmarkListResponse>;
    getFeedDetails(token: string, feedId: number): Promise<FeedDetailResponse>;
    createFeed(token: string, feedData: CreateFeedDTO): Promise<ApiResponse>;
    deleteFeed(token: string, feedId: number): Promise<ApiResponse>;
    updateFeed(token: string, feedId: number, feedData: UpdateFeedDTO): Promise<ApiResponse>;
    createFeedComment(token: string, feedId: number, content: string): Promise<ApiResponse>;
    updateFeedComment(token: string, commentId: number, feedId: number, content: string): Promise<ApiResponse>;
    deleteFeedComment(token: string, commentId: number, feedId: number): Promise<ApiResponse>;
    handleFeedLike(token: string, feedId: number, isLiked: unknown): Promise<ApiResponse>;
    createBookmark(token: string, feedId: number): Promise<ApiResponse>;
    deleteBookmark(token: string, feedId: number): Promise<ApiResponse>;
    handleBookmark(token: string, feedId: number, isBookmarked: unknown): Promise<ApiResponse>;
}
