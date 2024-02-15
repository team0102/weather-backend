// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   // controller에 요청이 왔을 때 constructor가 실행
//   constructor(private readonly configService: ConfigService) {
//     super({
//       // accessToken 위치
//       // jwtFromRequest: ExtractJwt.fromExtractors([
//       //   (request) => {
//       //     return request.cookies.accessToken;
//       //   },
//       // ]), // 쿠키 사용 기준
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer Token 사용시

//       ignoreExpiration: false,
//       // secretOrKey: configService.get<string>('JWT_SECRET'),
//       secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
//     });
//   }

//   async validate(payload) {
//     return {
//       userId: payload.userId,
//       userEmail: payload.userEmail,
//     };
//   }
// }
