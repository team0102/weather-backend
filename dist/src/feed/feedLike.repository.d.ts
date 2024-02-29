import { FeedLikeEntity } from 'src/entities/feedLikes.entity';
import { Repository } from 'typeorm';
export declare class FeedLikeRepository {
    private readonly feedLikeRepository;
    constructor(feedLikeRepository: Repository<FeedLikeEntity>);
    findFeedLikeByFeedIdAndUserId(loginUserId: number, feedId: number): Promise<FeedLikeEntity>;
    createFeedLike(loginUserId: number, feedId: number): Promise<void>;
    deleteFeedLike(id: number): Promise<void>;
    deleteFeedLikesByIds(ids: number[]): Promise<void>;
}
