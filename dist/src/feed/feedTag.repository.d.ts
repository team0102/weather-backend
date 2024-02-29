import { FeedTagEntity } from 'src/entities/feedTags.entity';
import { Repository } from 'typeorm';
export declare class FeedTagRepository {
    private readonly feedTagRepository;
    constructor(feedTagRepository: Repository<FeedTagEntity>);
    createFeedTags(feedId: number, tagIds: number[]): Promise<({
        feed: {
            id: number;
        };
        tag: {
            id: number;
        };
    } & FeedTagEntity)[]>;
    deleteFeedTags(feedTagsIds: number[]): Promise<void>;
}
