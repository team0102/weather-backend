import { FeedEntity } from './feeds.entity';
export declare class WeatherConditionEntity {
    id: number;
    condition: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    feed: FeedEntity[];
}
