import { Injectable, Inject } from '@nestjs/common';
// import * as Redis from 'ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisUserService {
  private readonly client: Redis;

  constructor(
    @Inject('REDIS_HOST') private readonly REDIS_HOST: string,
    @Inject('REDIS_PORT') private readonly REDIS_PORT: number,
    @Inject('REDIS_PASSWORD') private readonly REDIS_PASSWORD: string,
  ) {
    this.client = new Redis({
      host: this.REDIS_HOST,
      port: this.REDIS_PORT,
      password: this.REDIS_PASSWORD,
    });
  }

  getClient(): Redis {
    return this.client;
  }

  async set(key: string, value: string, expirationTime: number): Promise<void> {
    await this.client.set(key, value, 'EX', expirationTime);
  }

  async get(key: string): Promise<string | null> {
    const result = await this.client.get(key);
    return result as string | null;
  }
}

// // test_1--------------------------------------------------------------------------------------

// // // import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';

// // import { Injectable, Inject } from '@nestjs/common';
// // import { Cache } from 'cache-manager';
// // import { CACHE_MANAGER } from '@nestjs/cache-manager'; // 수정된 부분

// // import { Redis } from 'ioredis';

// // @Injectable()
// // export class RedisService_test {
// //   constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

// //   //   async get(key: string): Promise<any> {
// //   //     return await this.cache.get(key);
// //   //   }

// //   //   async set(key: string, value: any, option?: any) {
// //   //     await this.cache.set(key, value, option);
// //   //   }

// //   async reset() {
// //     await this.cache.reset();
// //   }

// //   async del(key: string) {
// //     await this.cache.del(key);
// //   }

// //   // ---
// //   async set(key: string, value: string, expirationTime: number): Promise<void> {
// //     // await this.redis.set(key, value, 'EX', expirationTime);
// //     await this.cache.set(key, value, expirationTime);
// //   }

// //   async get(key: string): Promise<string | null> {
// //     // const result = await this.redis.get(key);
// //     const result = await this.cache.get(key);
// //     return result as string | null;
// //   }
// // }

// // test_2--------------------------------------------------------------------------------------

// // import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';

// // import { Injectable, Inject } from '@nestjs/common';
// // import { Cache } from 'cache-manager';
// // import { CACHE_MANAGER } from '@nestjs/cache-manager'; // 수정된 부분

// // import { Redis } from 'ioredis';

// // @Injectable()
// // export class RedisService_test_2 {
// //   constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

// //   //   async get(key: string): Promise<any> {
// //   //     return await this.cache.get(key);
// //   //   }

// //   //   async set(key: string, value: any, option?: any) {
// //   //     await this.cache.set(key, value, option);
// //   //   }

// //   async reset() {
// //     await this.cache.reset();
// //   }

// //   async del(key: string) {
// //     await this.cache.del(key);
// //   }

// //   // ---
// //   async set(key: string, value: string, expirationTime: number): Promise<void> {
// //     // await this.redis.set(key, value, 'EX', expirationTime);
// //     await this.cache.set(key, value, expirationTime);
// //   }

// //   async get(key: string): Promise<string | null> {
// //     // const result = await this.redis.get(key);
// //     const result = await this.cache.get(key);
// //     return result as string | null;
// //   }
// // }

// // test_3--------------------------------------------------------------------------------------

// // import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';

// // import { Injectable, Inject } from '@nestjs/common';
// // import { Cache } from 'cache-manager';
// // import { CACHE_MANAGER } from '@nestjs/cache-manager'; // 수정된 부분

// // import { Redis } from 'ioredis';

// // @Injectable()
// // export class RedisService_test_3 {
// //   constructor(@Inject(Redis) private readonly redis: Redis) {}

// //   async set(key: string, value: string, expirationTime: number): Promise<void> {
// //     // await this.redis.set(key, value, 'EX', expirationTime);
// //     await this.redis.set(key, value, 'EX', expirationTime);
// //   }

// //   async get(key: string): Promise<string | null> {
// //     // const result = await this.redis.get(key);
// //     const result = await this.redis.get(key);
// //     return result as string | null;
// //   }
// // }
