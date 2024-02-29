import { Repository } from 'typeorm';
import { UserFollowEntity } from 'src/entities/userFollows.entity';
import { UserFollowDto } from './dto/user.dto';
export declare class UserFollowRepository {
    private readonly userFollowTypeormRepository;
    constructor(userFollowTypeormRepository: Repository<UserFollowEntity>);
    checkFollowOverlap(userFollowDto: any): Promise<number>;
    createUserFollow(userFollowDto: UserFollowEntity): Promise<void>;
    findFollowRelation(userFollowDto: UserFollowDto): Promise<UserFollowEntity[] | null>;
    deleteUserFollow(followRelation: UserFollowEntity[]): Promise<void>;
    findFollowingList(userId: number): Promise<UserFollowEntity[] | null>;
    findFollowerList(followUserId: number): Promise<UserFollowEntity[] | null>;
}
