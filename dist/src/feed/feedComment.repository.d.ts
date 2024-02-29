import { Repository } from 'typeorm';
import { FeedCommentEntity } from 'src/entities/feedComments.entity';
export declare class FeedCommentRepository {
    private readonly feedCommentRepository;
    constructor(feedCommentRepository: Repository<FeedCommentEntity>);
    getFeedCommentById(id: number): Promise<FeedCommentEntity>;
    createFeedComment(userId: number, feedId: number, content: string): Promise<FeedCommentEntity>;
    deleteFeedComment(commentId: number): Promise<void>;
    updateFeedComment(commentId: number, content: string): Promise<void>;
}
