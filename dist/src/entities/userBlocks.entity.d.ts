import { UserEntity } from './users.entity';
export declare class UserBlockEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity | number;
    blockUser: UserEntity | number;
}
