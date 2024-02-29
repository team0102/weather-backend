import { FeedEntity } from './feeds.entity';
import { TagEntity } from './tags.entity';
export declare class FeedTagEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    feed: FeedEntity;
    tag: TagEntity;
}
