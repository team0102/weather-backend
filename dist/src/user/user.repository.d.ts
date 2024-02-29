import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users.entity';
import { SignUpUserInfoDto } from './dto/user.dto';
export declare class UserRepository {
    private readonly userTypeormRepository;
    constructor(userTypeormRepository: Repository<UserEntity>);
    findUserByUid(socialAccountUid: string): Promise<UserEntity | null>;
    getCheckNicknameOverlap(nickname: string): Promise<Number>;
    findOneById(userId: number): Promise<UserEntity | null>;
    deleteUserById(id: number): Promise<void>;
    updateUserInfo(userInfoDto: UserEntity): Promise<void>;
    createUser(signUpUserInfo: SignUpUserInfoDto): Promise<UserEntity>;
    findUserByKakaoId(kakaoId: string): Promise<UserEntity>;
    createKakaoUser(data: {
        kakaoId: string;
        username: string;
        displayName: string;
        email: string | null;
    }): Promise<UserEntity>;
}
