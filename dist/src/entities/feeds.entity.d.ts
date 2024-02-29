import { UserEntity } from './users.entity';
import { FeedImageEntity } from './feedImages.entity';
import { FeedCommentEntity } from './feedComments.entity';
import { FeedTagEntity } from './feedTags.entity';
import { FeedLikeEntity } from './feedLikes.entity';
import { BookmarkEntity } from './bookmarks.entity';
import { WeatherConditionEntity } from './weatherCondition.entity';
export declare class FeedEntity {
    id: number;
    content: string;
    lowTemperature: number;
    highTemperature: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: UserEntity;
    weatherCondition: WeatherConditionEntity;
    feedImage: FeedImageEntity[];
    feedComment: FeedCommentEntity[];
    feedLike: FeedLikeEntity[];
    feedTag: FeedTagEntity[];
    bookmark: BookmarkEntity[];
}
