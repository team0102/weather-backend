import { Repository } from 'typeorm';
import { UserBlockEntity } from 'src/entities/userBlocks.entity';
import { UserBlockDto } from './dto/user.dto';
export declare class UserBlockRepository {
    private readonly userBlockTypeormRepository;
    constructor(userBlockTypeormRepository: Repository<UserBlockEntity>);
    findBlockRelation(userBlock: UserBlockDto): Promise<UserBlockEntity | null>;
    createUserBlock(userBlock: UserBlockEntity): Promise<void>;
    deleteUserBlock(isBlocked: UserBlockEntity): Promise<void>;
    findUserBlockList(userId: number): Promise<UserBlockEntity[] | null>;
}
