import { Redis } from 'ioredis';
export declare class RedisUserService {
    private readonly REDIS_HOST;
    private readonly REDIS_PORT;
    private readonly REDIS_PASSWORD;
    private readonly client;
    constructor(REDIS_HOST: string, REDIS_PORT: number, REDIS_PASSWORD: string);
    getClient(): Redis;
    set(key: string, value: string, expirationTime: number): Promise<void>;
    get(key: string): Promise<string | null>;
}
