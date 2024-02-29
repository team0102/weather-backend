import { FeedEntity } from './feeds.entity';
import { UserEntity } from './users.entity';
export declare class FeedLikeEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    feed: FeedEntity;
    user: UserEntity;
}
