import { FeedEntity } from './feeds.entity';
import { UserEntity } from './users.entity';
export declare class FeedCommentEntity {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    feed: FeedEntity;
    user: UserEntity;
}
