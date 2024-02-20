import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  //   private readonly redis: Redis.Redis;
  private readonly redis: Redis;
  private readonly configService: ConfigService;

  constructor() {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  // host: configService.get<string>('REDIS_HOST'),

  // REDIS_HOST=127.0.0.1
  // REDIS_PORT=6379
  // REDIS_USERNAME=root
  // REDIS_PASSWORD=pw
  // REDIS_DATABASE=weather

  // ---

  //   async set(key: string, value: string, expirationTime: number): Promise<void> {
  //     // await this.redis.set(key, value, ...args);
  //     // await this.redis.set(key, value, ...['EX', expirationTime]);
  //     await this.redis.set(key, value, 'EX', expirationTime);
  //   }

  //   async get(key: string): Promise<string | null> {
  //     const result = await this.redis.get(key);
  //     return result as string | null;
  //   }
  // }

  //   async set(
  //     key: string,
  //     value: string,
  //     flag: string,
  //     expirationTime: number,
  //   ): Promise<void> {
  //     // await this.redis.set(key, value, flag, expirationTime);
  //     await this.redis.set(key, value, [flag, expirationTime]);
  //   }

  async set(key: string, expirationTime: number, value: string): Promise<void> {
    await this.redis.setex(key, expirationTime, value);
  }

  async get(key: string): Promise<string | null> {
    const result = await this.redis.get(key);
    return result as string | null;
  }
}
