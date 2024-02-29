import { FeedEntity } from './feeds.entity';
export declare class FeedImageEntity {
    id: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    feed: FeedEntity;
}
