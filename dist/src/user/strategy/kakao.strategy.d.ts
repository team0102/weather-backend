import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-kakao';
declare const KakaoStrategy_base: new (...args: any[]) => any;
export declare class KakaoStrategy extends KakaoStrategy_base {
    readonly configService: ConfigService;
    constructor(configService: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void): Promise<void>;
}
export {};
