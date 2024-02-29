import { UserEntity } from './users.entity';
export declare class UserFollowEntity {
    id: number;
    isFollowingBack: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity | number;
    followUser: UserEntity | number;
}
