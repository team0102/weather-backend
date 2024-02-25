// redis/redis.module.ts
import { Module, Global, DynamicModule } from '@nestjs/common';
import { RedisUserService } from './redis.user.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class RedisUserModule {
  static register(): DynamicModule {
    return {
      module: RedisUserModule,
      providers: [
        RedisUserService,
        {
          provide: 'REDIS_HOST',
          useFactory: (configService: ConfigService) =>
            configService.get('REDIS_HOST'),
          inject: [ConfigService],
        },
        {
          provide: 'REDIS_PORT',
          useFactory: (configService: ConfigService) =>
            configService.get('REDIS_PORT'),
          inject: [ConfigService],
        },
        {
          provide: 'REDIS_PASSWORD',
          useFactory: (configService: ConfigService) =>
            configService.get('REDIS_PASSWORD'),
          inject: [ConfigService],
        },
      ],
      exports: [RedisUserService],
    };
  }
}

// test_1--------------------------------------------------------------------------------------

// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';

// import * as redisStore from 'cache-manager-redis-store';
// import { RedisService_test } from './redis.service_1';

// const cacheModule = CacheModule.register({
//   useFactory: async () => ({
//     store: redisStore,
//     host: process.env.REDIS_HOST, // env에서 정의
//     port: process.env.REDIS_PORT, // env에서 정의
//     ttl: 15, // 캐시 유지 시간(초)
//   }),
// });

// @Module({
//   imports: [cacheModule],
//   providers: [RedisService_test],
//   exports: [RedisService_test],
// })
// export class RedisModule {}

// test_2--------------------------------------------------------------------------------------

// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-redis-store';

// import { RedisService_test_2 } from './redis.service_2';
// import { createClient } from 'redis';
// import { RedisService_test } from './redis.service_1';
// import { Redis } from 'ioredis';

// // const mod = Redis.createClient

// const client = createClient({
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,

//   // REDIS_HOST=127.0.0.1   # or localhost, 테스트 후 결정
//   // REDIS_PORT=6379
//   // REDIS_USERNAME=root
//   // REDIS_PASSWORD=pw
//   // REDIS_DATABASE=weather
// });
// client.on('error', (err) => console.log('Redis Client Error', err));

// // await client.connect();
// client.connect();

// // @Module({
// //   imports: [client],
// //   providers: [RedisService_test_2]
// //   exports: [RedisService_test_2]
// // })
// // export class RedisModule_2 {}

// // -------------------------------------------
// // const cacheModule = CacheModule.register({
// //   useFactory: async () => ({
// //     store: redisStore,
// //     host: process.env.REDIS_HOST, // env에서 정의함
// //     port: process.env.REDIS_PORT, // env에서 정의함
// //     ttl: 10, // 캐시 유지 시간(초)
// //   }),
// // });

// // @Module({
// //   imports: [cacheModule],
// //   providers: [RedisService_test],
// //   exports: [RedisService_test],
// // })
// // export class RedisModule {}

// test_3--------------------------------------------------------------------------------------

// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-redis-store';

// import { RedisService_test_2 } from './redis.service_2';
// import { createClient } from 'redis';
// import { RedisService_test } from './redis.service_1';
// import { Redis } from 'ioredis';
// import { RedisModule } from 'nestjs-redis';
// import { RedisService_test_3 } from './redis.service_3';

// // const redis = new Redis();

// const RedisModule_test_3 = RedisModule.register({
//   name: 'default',
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
//   // host: process.env.REDIS_HOST, // env에서 정의함
//   // port: Number(process.env.REDIS_PORT), // env에서 정의함
// });

// // const redis = new Redis({
// //   port: Number(process.env.REDIS_PORT),
// //   host: process.env.REDIS_HOST,
// //   // username,
// //   // password,
// //   // db
// // });

// // redis.set('keyTest', 'valueTest', 'EX', 10);

// // redis.get('keyTest', (err, result) => {
// //   if (err) {
// //     console.log(err);
// //   } else console.log(result);
// // });

// @Module({
//   imports: [RedisModule_test_3],
//   providers: [RedisService_test_3],
//   exports: [RedisService_test_3],
// })
// export class RedisModule_3 {}

// // ------------------------------------

// // const client = createClient({
// //   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,

// // REDIS_HOST=127.0.0.1   # or localhost, 테스트 후 결정
// // REDIS_PORT=6379
// // REDIS_USERNAME=root
// // REDIS_PASSWORD=pw
// // REDIS_DATABASE=weather
// // });
// // client.on('error', (err) => console.log('Redis Client Error', err));

// // await client.connect();
// // client.connect();

// // @Module({
// //   imports: [client],
// //   providers: [RedisService_test_2]
// //   exports: [RedisService_test_2]
// // })
// // export class RedisModule_2 {}

// // ------------------------------------------------------------------------------------------------------
// // const cacheModule = CacheModule.register({
// //   useFactory: async () => ({
// //     store: redisStore,
// //     host: process.env.REDIS_HOST, // env에서 정의함
// //     port: process.env.REDIS_PORT, // env에서 정의함
// //     ttl: 10, // 캐시 유지 시간(초)
// //   }),
// // });

// // @Module({
// //   imports: [cacheModule],
// //   providers: [RedisService_test],
// //   exports: [RedisService_test],
// // })
// // export class RedisModule {}
