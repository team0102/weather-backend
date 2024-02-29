import { FeedEntity } from '../entities/feeds.entity';
import { Repository } from 'typeorm';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { FeedImageEntity } from 'src/entities/feedImages.entity';
import { UpdateFeedDTO } from './dto/update-feed.dto';
export declare class FeedRepository {
    private readonly feedRepository;
    private readonly feedImageRepository;
    constructor(feedRepository: Repository<FeedEntity>, feedImageRepository: Repository<FeedImageEntity>);
    getFeedListWithDetails(): Promise<FeedEntity[]>;
    getFeedWithDetailsById(feedId: number): Promise<FeedEntity>;
    createFeed(userId: number, feedData: CreateFeedDTO): Promise<FeedEntity>;
    deletedFeed(findFeed: FeedEntity): Promise<void>;
    updateFeed(feedId: number, feedData: UpdateFeedDTO): Promise<import("typeorm").UpdateResult>;
}
