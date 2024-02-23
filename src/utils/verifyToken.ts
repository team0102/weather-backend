import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisUserService } from 'src/user/redis/redis.user.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisUserService: RedisUserService,
  ) {}

  async verifyToken(token: string): Promise<{ aud: number }> {
    const logoutCheck = await this.redisUserService.get(token);
    if (logoutCheck !== null) throw new BadRequestException('LOGIN_REQUIRED');

    const decodedToken = await this.jwtService.verify(token);

    return await decodedToken;
  }

  async audienceFromToken(token: string): Promise<number> {
    const decodedToken = await this.verifyToken(token);
    const loginUserId = decodedToken.aud;

    return loginUserId;
  }
}
