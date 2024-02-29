import { JwtService } from '@nestjs/jwt';
import { RedisUserService } from 'src/user/redis/redis.user.service';
export declare class TokenService {
    private readonly jwtService;
    private readonly redisUserService;
    constructor(jwtService: JwtService, redisUserService: RedisUserService);
    verifyToken(token: string): Promise<{
        aud: number;
    }>;
    audienceFromToken(token: string): Promise<number>;
}
