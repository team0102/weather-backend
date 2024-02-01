import { UUID } from 'crypto';
import { Request as Req } from 'express';
import { Types } from 'mysql2';
// import { Types } from 'mongoose';

declare module 'express' {
  interface Request extends Req {
    user: {
      kakaoId?: string; // number??????
      //   userId?: Types.ObjectId;  // mongo 기준 ObjectId, RDB 기준 uuid?
      userId?: UUID;
      email?: string; // 추가
      kakaoEmail?: string;
      kakaoNickname?: string;
      kakaoProfileImage?: string;
    };
  }
}
